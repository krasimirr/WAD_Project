from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Index page.")
	
def signup(request):
    return HttpResponse("Signup page.")

def login(request):
    return HttpResponse("Login page.")
	
def logout(request):
    return HttpResponse("Logout page.")

def changepassword(request):
    return HttpResponse("Change_password page.")
	
def profile(request):
    return HttpResponse("Profile page.")