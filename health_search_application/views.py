from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'health_search_application/index.html')
	
def signup(request):
    return render(request, 'health_search_application/signup.html')

def login(request):
    return render(request, 'health_search_application/login.html')
	
def logout(request):
    return render(request, 'health_search_application/logout.html')

def changepassword(request):
    return render(request, 'health_search_application/changepassword.html')
	
def profile(request):
    return render(request, 'health_search_application/profile.html')