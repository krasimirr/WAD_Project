import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'WAD_Project.settings')

import django
from django.contrib import auth
from django.utils.timezone import now as utcnow
django.setup()

from django.contrib.auth.models import User

# populate
def populate():
    add_user('jim')
    add_user('jill')
    add_user('joe')

    # Print out the users we have added as well as their password
    for u in User.objects.all():
        print "Username: "+u.username+" Password: "+u.username

# create three superusers (+staff rights in order to access the admin page)
def add_user(name):
    # (username, email, password)
    user = User.objects.create_user(name,name+"@"+name+".com",name)
    user = auth.authenticate(username=name,password=name)
    user.first_name=name
    user.last_name=name
    user.is_superuser=True
    user.is_staff=True
    user.save()

    if user is not None:
        cu = user.profile
        cu.is_app_user = False
        cu.save()


# Start execution here!
if __name__ == '__main__':
    print "Starting Health app population script..."
    populate()
