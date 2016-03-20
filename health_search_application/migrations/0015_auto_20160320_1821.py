# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0014_contact_received'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='userName',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
