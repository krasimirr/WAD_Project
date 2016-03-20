# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0011_auto_20160315_1349'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='gravatar_url',
            field=models.CharField(default=b'Empty', max_length=300),
            preserve_default=True,
        ),
    ]
