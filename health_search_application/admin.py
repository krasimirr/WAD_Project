from django.contrib import admin
from health_search_application.models import Category, Page


class showCategory(admin.ModelAdmin):
    list_display = ('name')

class showPage(admin.ModelAdmin):
    list_display = ('category', 'title', 'url', 'readingRating', 'sentimentRating')

admin.site.register(Category)
admin.site.register(Page, showPage)
