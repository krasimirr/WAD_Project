from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt
from health_search_application.models import AppUser, Category, Page
from django.contrib.auth.models import User, Permission
import datetime
from django.utils.timezone import now as utcnow
from django.contrib.auth import models
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import requests
import xml.etree.ElementTree as ET
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
import re
import bs4 as BeautifulSoup
from textstat.textstat import textstat
from textblob import TextBlob
import json
import urllib, urllib2
from django.utils.html import strip_tags

# Add your BING_API_KEY

BING_API_KEY = 'FitjpCKCS8W+p6jB14n660G3bGC9QTOrcIiPXRb4LwM'


def index(request):
    if request.method=='POST':

        categoriesDict={}
        categoriesDict['allCategories']=Category.objects.filter(userName=request.user.username)

        title=request.POST.get('title','')
        url=request.POST.get('url','')
        readingRating=request.POST.get('readingRating','')
        sentimentRating=request.POST.get('sentimentRating','')
        categoryName=request.POST.get('category','')

        if title!='' and url!='' and readingRating!='' and sentimentRating!='' and categoryName!='':
            
            if not Category.objects.filter(userName=request.user.username, name=categoryName).exists():
                c = Category(userName=request.user.username, name=categoryName)
                c.save()
            else:
                c = Category.objects.get(userName=request.user.username, name=categoryName)
            if not Page.objects.filter(uName=request.user.username, url=url).exists():
                p = Page(uName=request.user.username, category=c, title=title, url=url, readingRating=readingRating, sentimentRating=sentimentRating)
                p.save()
            
        # list of words searched
        searchstr=request.POST.get('search','')
        search=searchstr.split(" ")

        healthDict=healthapif(search)
        medlineDict=medlineapif(search)
        bingDict=bingapif(searchstr)

        allapisDict=healthDict.copy()
        allapisDict.update(medlineDict)
        allapisDict.update(bingDict)
        
	return render(request,'health_search_application/index.html',{'allapis': allapisDict.iteritems(),
                                                                      'healthapi': healthDict.iteritems(),
                                                                      'medlineapi': medlineDict.iteritems(),
                                                                      'bingapi': bingDict.iteritems(),
                                                                      'search': searchstr,
                                                                      'alllength': len(allapisDict),
                                                                      'allCategories': categoriesDict.iteritems()})
    if request.user.username and request.user.profile.is_app_user:
	return render(request, 'health_search_application/index.html')
    else:
	return HttpResponseRedirect(reverse('login'))

def healthapif(search):
    healthDict={}
    # initial health api form
    health_api="http://healthfinder.gov/developer/Search.xml?api_key=gnviveyezcuamzei&keyword="

    # construct health query
    for word in search:
        health_api+=word+"%20"

    # remove the last %20
    health_api=health_api[:-3]

    # fetch the results
    j=requests.get(health_api).content

    root = ET.fromstring(j)

    # get data from Url tags only
    for i in root.iter('Item'):
        title = i[0].text
        url = i[1].text
        healthDict[url]=[title]

        # Page content
        content=findContentHealth(url)
        
        if content!="empty":
            # Reading ease score
            score=textstat.flesch_reading_ease(content)
            scoreText=readingEaseScore(score)
            healthDict[url].append(str(score)+" ("+scoreText+")")
        else:
            healthDict[url].append("-")
            
        # Sentiment score
        blob = TextBlob(content)
        sentimentPolarity = blob.sentiment.polarity
        sentimentSubjectivity = blob.sentiment.subjectivity
        sentimentScore="polarity= %.3f subjectivity= %.3f " % (sentimentPolarity, sentimentSubjectivity)
        healthDict[url].append(sentimentScore)

    return healthDict

def medlineapif(search):
    medlineDict={}
    medline_api="https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=%22"
    for word in search:
        medline_api+=word+"%20+OR+"

    medline_api=medline_api[:-4]
        
    j=requests.get(medline_api).content

    root = ET.fromstring(j)

    for i in root.iter('document'):
        title=str(i[0].text)
        if "span" in title:
            title = re.search('">(.+?)</span>',title)
            title=title.group(1)
        url=str(i.attrib)
        url=url.split(" ")[1][1:-2]
        medlineDict[url]=[title]

        # Page content
        content=findContentMedline(url)

        if content!="empty":
            # Reading ease score
            score=textstat.flesch_reading_ease(content)
            scoreText=readingEaseScore(score)
            medlineDict[url].append(str(score)+" ("+scoreText+")")
        else:
            medlineDict[url].append("-")

        # Sentiment score
        blob = TextBlob(content)
        sentimentPolarity = blob.sentiment.polarity
        sentimentSubjectivity = blob.sentiment.subjectivity
        sentimentScore="polarity= %.3f subjectivity= %.3f " % (sentimentPolarity, sentimentSubjectivity)
        medlineDict[url].append(sentimentScore)

    return medlineDict

def bingapif(search_terms):

    bingDict={}
    
    # Specify the base
    root_url = 'https://api.datamarket.azure.com/Bing/Search/'
    source = 'Web'

    # Specify how many results we wish to be returned per page.
    # Offset specifies where in the results list to start from.
    # With results_per_page = 10 and offset = 11, this would start from page 2.
    
    results_per_page = 10
    offset = 0

    # Wrap quotes around our query terms as required by the Bing API.
    # The query we will then use is stored within variable query.
    query = "'{0}'".format(search_terms)
    query = urllib.quote(query)

    # Construct the latter part of our request's URL.
    # Sets the format of the response to JSON and sets other properties.
    search_url = "{0}{1}?$format=json&$top={2}&$skip={3}&Query={4}".format(
        root_url,
        source,
        results_per_page,
        offset,
        query)

    # Setup authentication with the Bing servers.
    # The username MUST be a blank string, and put in your API key!
    username = ''


    # Create a 'password manager' which handles authentication for us.
    password_mgr = urllib2.HTTPPasswordMgrWithDefaultRealm()
    password_mgr.add_password(None, search_url, username, BING_API_KEY)

    # Create our results list which we'll populate.
    results = []

    try:
        # Prepare for connecting to Bing's servers.
        handler = urllib2.HTTPBasicAuthHandler(password_mgr)
        opener = urllib2.build_opener(handler)
        urllib2.install_opener(opener)

        # Connect to the server and read the response generated.
        response = urllib2.urlopen(search_url).read()

        # Convert the string response to a Python dictionary object.
        json_response = json.loads(response)

        # Loop through each page returned, populating out results list.
        for result in json_response['d']['results']:
            results.append({
            'title': result['Title'],
            'link': result['Url'],
            'summary': result['Description']})

    # Catch a URLError exception - something went wrong when connecting!
    except urllib2.URLError as e:
        print "Error when querying the Bing API: ", e

    for result in results:
        url = str(result['link'])
        title = result['title']
        summary = result['summary']
        bingDict[url]=[title]

        # Reading ease score
        score=textstat.flesch_reading_ease(summary)
        scoreText=readingEaseScore(score)
        bingDict[url].append(str(score)+" ("+scoreText+")")

                
        # Sentiment score
        blob = TextBlob(summary)
        sentimentPolarity = blob.sentiment.polarity
        sentimentSubjectivity = blob.sentiment.subjectivity
        sentimentScore="polarity= %.3f subjectivity= %.3f " % (sentimentPolarity, sentimentSubjectivity)
        bingDict[url].append(sentimentScore)


    return bingDict

def findContentHealth(url):
    soup = BeautifulSoup.BeautifulSoup(urllib2.urlopen(url).read(),"html.parser")
    result = soup.find("div", attrs={"class":"quickguide_tool_content"})

    try:
        if result == None:
            result = soup.find("div", attrs={"class":"page"})

        return result.text

    except:
        return "empty"

def findContentMedline(url):
    soup = BeautifulSoup.BeautifulSoup(urllib2.urlopen(url).read(),"html.parser")
    result = soup.find("div", attrs={"id":"topic-summary"})
    if result==None:
        return "empty"
    return result.text

def findContentBing(url):
    soup = BeautifulSoup.BeautifulSoup(urllib2.urlopen(url).read(),"html.parser")
    result = soup.find("div", attrs={"class":"col col-primary"})
    if result==None:
        return "empty"
    return result.text

def readingEaseScore(score):
    if score>=90:
        return "Very Easy"
    if score>=80 and score<=89:
        return "Easy"
    if score>=70 and score<=79:
        return "Fairly Easy"
    if score>=60 and score<=69:
        return "Standard"
    if score>=50 and score<=59:
        return "Fairly Difficult"
    if score>=30 and score<=49:
        return "Difficult"
    if score<=29:
        return "Very Confusing."
    else:
        return "-"

# FILTER BY NAME AND CATEGORY MANIPULATE  FOR THE ADDED DIR !!!!! SELECT !!!!!
def profile(request):
    if request.user.username and request.user.profile.is_app_user:

        userAvatar=request.user.profile.gravatar_url
        userData=[]
        userObj=User.objects.get(username=request.user.username)
        userData.append(['Username: ', userObj.username])
        userData.append(['First name: ', userObj.first_name])
        userData.append(['Last name: ', userObj.last_name])
        userData.append(['Email: ', userObj.email])

        

        if request.method == 'POST':
            nameCategory=request.POST.get('nameCategory','')
            urlPage=request.POST.get('urlPage','')
            newCategory=request.POST.get('newCategory','')
            
            if nameCategory!='':
                c=Category.objects.get(userName=request.user.username, name=nameCategory)
                c.delete()

            if urlPage!='':
                p=Page.objects.get(uName=request.user.username, url=urlPage)
                p.delete()

            if newCategory!='':
                print "praq"
                c = Category(userName=request.user.username, name=newCategory)
                c.save()
            
        catPageDict={}

        for c in Category.objects.filter(userName=request.user.username):
            catPageDict[str(c.name)]=[]

            pages = Page.objects.filter(uName=request.user.username, category=c)
            for p in pages:
                pageData=[]
                pageData.append(str(p.title))
                pageData.append(str(p.url))
                pageData.append(str(p.readingRating))
                pageData.append(str(p.sentimentRating))
                catPageDict[str(c.name)].append(pageData)

	return render(request, 'health_search_application/profile.html', {'user_categories': catPageDict.iteritems(),
                                                                          'keys': catPageDict.keys(),
                                                                          'userData': userData,
                                                                          'avatar': userAvatar,
                                                                          'email': userData[3][1]})
    else:
	return HttpResponseRedirect(reverse('login'))


def signup(request):
    context = {}
    if request.method == 'POST':
        username = request.POST.get('username','')
        fname = request.POST.get('firstname','')
        lname = request.POST.get('lastname','')
        password = request.POST.get('password','')
        email = request.POST.get('email','')

        if username!="" and User.objects.filter(username=username).exists():
            context['user_error']="Please, pick another username."
            return render(request,'health_search_application/signup.html',context)
        
        if username!="" and User.objects.filter(email=email).exists():
            context['email_error']="Please, pick another email."
            return render(request,'health_search_application/signup.html',context)
        
        if username!="" and password!="" and email!="" and len(username)<=10 and 6<=len(password)<=14 and \
           not User.objects.filter(username=username).exists() and not User.objects.filter(email=email).exists():
            user = User.objects.create_user(username,email,password)
            user = auth.authenticate(username=username,password=password)
            user.first_name=fname
            user.last_name=lname
            user.save()
            
        #if email!="" and validateEmail(email)==False:
            #context['error']="Please, use a valid email."
            #return render(request,'health_search_application/signup.html',context)

        
        if user is not None:
            auth.login(request,user)
            cu = request.user.profile
            cu.is_app_user = True
            cu.last_accessed = utcnow()
            cu.save()

            return HttpResponseRedirect(reverse('index'))
        else:
            context['error']="Please, fill in all the details."
            return render(request,'health_search_application/signup.html',context)

    context.update(csrf(request))
    return render(request,'health_search_application/signup.html',context)


#def validateEmail( email ):
#    try:
#        validate_email( email )
#        return True
#    except ValidationError:
#        return False

def login(request):
    if request.user.username and request.user.profile.is_app_user:
        return HttpResponseRedirect(reverse('index'))
    context = {'error':''}

    if request.method == 'POST':
        username = request.POST.get('username','') #return '' if no username
        password = request.POST.get('password','')

	user = auth.authenticate(username=username,password=password)

	if user is not None:
	    auth.login(request,user)
	    cu = request.user.profile
	    cu.is_app_user = True
	    cu.last_accessed = utcnow()
	    cu.save()
	    return HttpResponseRedirect(reverse('index'))
	else:
	    context['error'] = 'Wrong username and/or password. Try again.'
	    return render(request,'health_search_application/login.html',context)


    context.update(csrf(request))
    return render(request,'health_search_application/login.html',context)


def logout(request):
    cu = request.user.profile
    cu.is_app_user = False
    cu.save()
    return render(request,'health_search_application/logout.html')

def changepassword(request):
    if request.user.username and request.user.profile.is_app_user:
        context = {'error':''}
        if request.method=="POST":
            passwordnew = request.POST.get('passwordnew','')
            passwordneww = request.POST.get('passwordneww','')
            if passwordnew==passwordneww and 6<=len(passwordnew)<=14 and 6<=len(passwordnew)<=14:
                u = User.objects.get(username=request.user.username)
                u.set_password(passwordnew)
                u.save()
                return HttpResponseRedirect(reverse('login'))
            if passwordnew=="" or passwordnew=="":
                context['error'] = 'Please enter new password.'
                return render(request,'health_search_application/changepassword.html',context)
            if (len(passwordnew)<6 or len(passwordnew)>14 or len(passwordneww)<6 or len(passwordneww)>14) and passwordnew!="" and passwordneww!="":
                context['error'] = 'Password length must be no less than 6 chatacters and no more than 14.'
                return render(request,'health_search_application/changepassword.html',context)
            else:
                context['error'] = 'Passwords do not match.'
                return render(request,'health_search_application/changepassword.html',context)
        context.update(csrf(request))
        return render(request,'health_search_application/changepassword.html',context)
    else:
        return render(request,'health_search_application/changepassword.html')

def contact(request):
    if request.method == 'POST':
        subject = request.POST.get('name', '')
        message = request.POST.get('message', '')
        from_email = request.POST.get('email', '')
        if subject and message and from_email:
            try:
                send_mail(subject, message, from_email, ['admin@example.com'])
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return HttpResponseRedirect('/contact/thanks/')
        else:
            return HttpResponse('Make sure all fields are entered and valid.')
    else:
        return render(request,'health_search_application/contact.html',{})
