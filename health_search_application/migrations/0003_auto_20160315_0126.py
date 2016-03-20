# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0002_category_page'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='readingRating',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='page',
            name='sentimentRating',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='page',
            name='url',
            field=models.CharField(max_length=150),
        ),
    ]
