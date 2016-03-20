# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0008_auto_20160315_0316'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='uName',
            field=models.CharField(default=b'', max_length=128),
            preserve_default=True,
        ),
    ]
