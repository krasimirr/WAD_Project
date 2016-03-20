# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_search_application', '0012_appuser_gravatar_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('contact_name', models.CharField(default=b'', max_length=150)),
                ('contact_email', models.CharField(default=b'', max_length=150)),
                ('contact_message', models.CharField(default=b'', max_length=500)),
                ('is_answered', models.BooleanField(default=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
