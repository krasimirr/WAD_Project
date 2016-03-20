# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0005_auto_20160315_0128'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='url',
            field=models.URLField(),
        ),
    ]
