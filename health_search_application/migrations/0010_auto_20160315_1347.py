# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0009_page_uname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='userName',
            field=models.CharField(default=b'username', max_length=128),
        ),
    ]
