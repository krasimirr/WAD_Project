from django.db import models
from django.contrib.auth.signals import user_logged_in, user_logged_out  
from django.contrib.auth.models import User
import urllib, hashlib, binascii
from datetime import datetime

def hash_username(username):
	heashed = binascii.crc32(username)
	return heashed

class AppUser(models.Model):
	user = models.OneToOneField(User)
	userID =  models.IntegerField()
	username = models.CharField(max_length=300)
	is_app_user = models.BooleanField(default=False)
	last_accessed = models.DateTimeField(auto_now_add=True)
	
User.profile = property(lambda u: AppUser.objects.get_or_create(user=u,defaults={'username':u.username,'userID':hash_username(u.username)})[0])
