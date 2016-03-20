from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt
from health_search_application.models import AppUser, Category, Page, Contact
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
from django.contrib.auth.decorators import user_passes_test


# OUR BING_API_KEY
BING_API_KEY = 'FitjpCKCS8W+p6jB14n660G3bGC9QTOrcIiPXRb4LwM'




# ===================================================================== LOGIN =====================================================================
def login(request):
    if request.user.username and request.user.profile.is_app_user:
        return HttpResponseRedirect(reverse('index'))
    context = {'error':''}

    # get the fields
    if request.method == 'POST':
        username = request.POST.get('username','') #return '' if no username
        password = request.POST.get('pass','')

        # authenticate the user
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




# ===================================================================== SIGNUP ====================================================================
def signup(request):
    context = {}
    if request.method == 'POST':

        # get all the fields
        username = request.POST.get('username','')
        fname = request.POST.get('firstname','')
        lname = request.POST.get('lastname','')
        password = request.POST.get('pass','')
        email = request.POST.get('email','')

        # if the user exists, pick another username
        if username!="" and User.objects.filter(username=username).exists():
            context['user_error']="Please, pick another username."
            return render(request,'health_search_application/signup.html',context)

        # if there is a registered user with the same email, pick another email        
        if username!="" and User.objects.filter(email=email).exists():
            context['email_error']="Please, pick another email."
            return render(request,'health_search_application/signup.html',context)
            
        if email!="" and validateEmail(email)==False:
            context['email_error']="Please, use a valid email."
            return render(request,'health_search_application/signup.html',context)

        # if everything is filled and unique as well as valid, create the user
        if username!="" and password!="" and email!="" and validateEmail(email) and len(username)<=10 and 3<=len(password)<=14 and \
           not User.objects.filter(username=username).exists() and not User.objects.filter(email=email).exists():
            user = User.objects.create_user(username,email,password)
            user = auth.authenticate(username=username,password=password)
            user.first_name=fname
            user.last_name=lname
            user.save()

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

# check if email is valid (again)
def validateEmail( email ):
    try:
        validate_email( email )
        return True
    except ValidationError:
        return False




# ===================================================================== INDEX =====================================================================
# main
def index(request):
    if request.method=='POST':

        categoriesDict={}
        categoriesDict['allCategories']=Category.objects.filter(userName=request.user.username)

        # get the attributes of the result we want to save
        title=request.POST.get('title','')
        url=request.POST.get('url','')
        readingRating=request.POST.get('readingRating','')
        sentimentRating=request.POST.get('sentimentRating','')

        # the category we want to put our result into
        categoryName=request.POST.get('category','')

        # if we have all of the attributes of the result and a category name, then proceed
        if title!='' and url!='' and readingRating!='' and sentimentRating!='' and categoryName!='':

            # if the category does not exist, create it, otherwise extract it from the db
            if not Category.objects.filter(userName=request.user.username, name=categoryName).exists():
                c = Category(userName=request.user.username, name=categoryName)
                c.save()
            else:
                c = Category.objects.get(userName=request.user.username, name=categoryName)

            # if the page has not been saved before, save it
            if not Page.objects.filter(uName=request.user.username, url=url).exists():
                p = Page(uName=request.user.username, category=c, title=title, url=url, readingRating=readingRating, sentimentRating=sentimentRating)
                p.save()
            
        # from string to list of words searched
        searchstr=request.POST.get('search','')
        search=searchstr.split(" ")

        # fill in the dictionaries for each api
        healthDict=healthapif(search)
        medlineDict=medlineapif(search)
        bingDict=bingapif(searchstr)

        # a dictionary, containing all of the results
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




# ===================================================================== APIs =====================================================================

# get the result from Health Api and return it as a dictionary
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

    # get data from 'Url' tags only
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


# get the result from Medline Api and return it as a dictionary
def medlineapif(search):
    
    medlineDict={}
    
    # initial medline api form
    medline_api="https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=%22"

    # construct medline query
    for word in search:
        medline_api+=word+"%20+OR+"

    # remove the last +OR+
    medline_api=medline_api[:-4]

    # fetch the results
    j=requests.get(medline_api).content

    root = ET.fromstring(j)

    # get data from 'document' tags only
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


# get the result from Bing Api and return it as a dictionary
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

    # construct the dictionary
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




# ===================================================================== EXTRACT CONTENT =====================================================================

# find the content of a Health finder page (in order to do the scorings)
def findContentHealth(url):
    soup = BeautifulSoup.BeautifulSoup(urllib2.urlopen(url).read(),"html.parser")
    result = soup.find("div", attrs={"class":"quickguide_tool_content"})

    try:
        if result == None:
            result = soup.find("div", attrs={"class":"page"})

        return result.text

    except:
        return "empty"


# find the content of a Medline page (in order to do the scoring)
def findContentMedline(url):
    soup = BeautifulSoup.BeautifulSoup(urllib2.urlopen(url).read(),"html.parser")
    result = soup.find("div", attrs={"id":"topic-summary"})
    if result==None:
        return "empty"
    return result.text


# find the content of a Bing page (in order to do the scoring)
def findContentBing(url):
    soup = BeautifulSoup.BeautifulSoup(urllib2.urlopen(url).read(),"html.parser")
    result = soup.find("div", attrs={"class":"col col-primary"})
    if result==None:
        return "empty"
    return result.text


# get the text equivalent of a given score
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




# ===================================================================== PROFILE =====================================================================
# User's profile, return a dictionary with user's data, categories and pages
def profile(request):
    if request.user.username and request.user.profile.is_app_user:

        # All of the user's data
        userAvatar=request.user.profile.gravatar_url
        userData=[]
        userObj=User.objects.get(username=request.user.username)
        userData.append(['Username: ', userObj.username])
        userData.append(['First name: ', userObj.first_name])
        userData.append(['Last name: ', userObj.last_name])
        userData.append(['Email: ', userObj.email])

        # create/delete a category, delete a page
        if request.method == 'POST':
            nameCategory=request.POST.get('nameCategory','')
            urlPage=request.POST.get('urlPage','')
            newCategory=request.POST.get('newCategory','')
            newPassword=request.POST.get('newPassword','')
            
            if nameCategory!='':
                c=Category.objects.get(userName=request.user.username, name=nameCategory)
                c.delete()

            if urlPage!='':
                p=Page.objects.get(uName=request.user.username, url=urlPage)
                p.delete()

            if newCategory!='':
                if not Category.objects.filter(userName=request.user.username, name=newCategory).exists():
                    c = Category(userName=request.user.username, name=newCategory)
                    c.save()

            if newPassword!='':
                u = User.objects.get(username=request.user.username)
                u.set_password(newPassword)
                u.save()
                cu = request.user.profile
                cu.is_app_user = False
                cu.save()
                return render(request,'health_search_application/login.html')
                
            
        catPageDict={}

        # dictionary with keys: the categories and values: the pages
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




# ===================================================================== LOGOUT =====================================================================
# Log out (change the user's field 'is_app_user' to prevent them to access the core pages of the web app
# Holds for not registered users aswell
def logout(request):
    cu = request.user.profile
    cu.is_app_user = False
    cu.save()
    return render(request,'health_search_application/logout.html')


# Contact us (creates a model with info that is passed from a registered/not registered user
def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '')
        from_email = request.POST.get('email', '')
        message = request.POST.get('message', '')
        if name and message and from_email:
            c = Contact(contact_name=name, contact_email=from_email, contact_message=message)
            c.save()
            return render(request,'health_search_application/thanks.html')
        else:
            return HttpResponse('Make sure all fields are entered and valid.')
    else:
        return render(request,'health_search_application/contact.html',{})




# ===================================================================== REPLAY TO USER =====================================================================
# can be seen from superusers only
# contact back the user(s)
# gmail account: healthmateteam@gmail.com
@user_passes_test(lambda u: u.is_superuser)
def sendemail(request, *args, **kwargs):
    if request.method == 'POST' and request.user.username and request.user.profile.is_app_user:
        email = 'healthmateteam@gmail.com'
        to_user = request.POST.get('email','')
        subject = request.POST.get('subject','')
        message = request.POST.get('message','')
        
        if email!='' and to_user!='' and subject!='' and message!='':
            c = Contact.objects.filter(contact_email=to_user, is_answered=False)

            # if we fetched the contact, send an email and update its field to answered (updates the first unanswered contact from the same user)
            if len(c)!=0:
                send_mail(subject, message, email, [to_user])
                c[0].is_answered=True
                c[0].save()

                return render(request,'health_search_application/send_email.html', {'sent_or_not': 'Successfully sent.'})
        
        return render(request,'health_search_application/send_email.html',{'sent_or_not': 'Could not send it.'})
    else:
        return render(request,'health_search_application/send_email.html', {})
