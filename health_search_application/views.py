from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt
from health_search_application.models import AppUser
from django.contrib.auth.models import User, Permission
import datetime
from django.utils.timezone import now as utcnow
from django.contrib.auth import models
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


def index(request):
    if request.method == 'POST':
        context = {'error':''}
        context['error'] = 'Wrong username and/or password. Try again.'
	return render(request,'health_search_application/index.html',context)
    if request.user.username and request.user.profile.is_app_user:
	return render(request, 'health_search_application/index.html')
    else:
	return HttpResponseRedirect(reverse('login'))
	
def profile(request):
    return render(request, 'health_search_application/profile.html')

def signup(request):
    global users
    context = {}
    users = str(User.objects.all()).split(" ")
    if request.method == 'POST':
        username = request.POST.get('username','')
        fname = request.POST.get('firstname','')
        lname = request.POST.get('lastname','')
        password = request.POST.get('password','')
        email = request.POST.get('email','')
        if username!="" and password!="" and email!="" and checku(username) and len(username)<=10 and 6<=len(password)<=14:
            user = User.objects.create_user(username,email,password)
            user = auth.authenticate(username=username,password=password)
            user.first_name=fname
            user.last_name=lname
            user.save()
        #if email!="" and validateEmail(email)==False:
            #context['error']="Please, use a valid email."
            #return render(request,'health_search_application/signup.html',context)
        if username!="" and checku(username)==False:
            context['user_error']="Please, pick another username."
            return render(request,'health_search_application/signup.html',context)
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

def checku(username):
    global users
    for u in users:
        if username==u[:-2]:
            return False
    return True

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
