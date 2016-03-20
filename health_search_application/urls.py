from django.conf.urls import patterns, url
from health_search_application import views

urlpatterns = patterns('',
        url(r'^$', views.index, name='index'),
	url(r'^signup', views.signup, name='signup'),
	url(r'^login', views.login, name='login'),
	url(r'^logout', views.logout, name='logout'),
	url(r'^changepassword', views.changepassword, name='changepassword'),
	url(r'^profile', views.profile, name='profile'),
        url(r'^contact', views.contact, name='contact'),
        url(r'^send_email/$', views.sendemail, name='send_email'),)

