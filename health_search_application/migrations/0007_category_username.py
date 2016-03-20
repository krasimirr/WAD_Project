# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0006_auto_20160315_0154'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='userName',
            field=models.CharField(default=b'username', max_length=128),
            preserve_default=True,
        ),
    ]
