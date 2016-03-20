from django.db import models
from django.contrib.auth.signals import user_logged_in, user_logged_out  
from django.contrib.auth.models import User
import urllib, hashlib, binascii
from datetime import datetime


class Category(models.Model):
    userName = models.ForeignKey(User)
    name = models.CharField(max_length=128, default="Default")

    def __unicode__(self):
        return self.name

class Page(models.Model):
    uName = models.CharField(max_length=128, default="")
    category = models.ForeignKey(Category)
    title = models.CharField(max_length=150)
    url = models.URLField()
    readingRating = models.CharField(max_length=150)
    sentimentRating = models.CharField(max_length=150)

    def __unicode__(self):
        return self.title

class Contact(models.Model):
    contact_name = models.CharField(max_length=150, default="")
    contact_email = models.CharField(max_length=150, default="")
    contact_message = models.CharField(max_length=500, default="")
    is_answered = models.BooleanField(default=False)
    received = models.DateTimeField(auto_now_add=True, default=None)

    def __unicode__(self):
        return self.contact_email

def hash_username(username):
	hashed = binascii.crc32(username)
	return hashed

def generate_avatar(email):
	avatar = "http://www.gravatar.com/avatar/"
	avatar+=hashlib.md5(email.lower()).hexdigest()
	avatar+='?d=identicon'
	return avatar

class AppUser(models.Model):
	user = models.OneToOneField(User)
	userID =  models.IntegerField()
	username = models.CharField(max_length=300)
	is_app_user = models.BooleanField(default=False)
	last_accessed = models.DateTimeField(auto_now_add=True)
	gravatar_url = models.CharField(max_length=300, default="Empty")
	
User.profile = property(lambda u: AppUser.objects.get_or_create(user=u,defaults={'gravatar_url':generate_avatar(u.email),'username':u.username,'userID':hash_username(u.username)})[0])
