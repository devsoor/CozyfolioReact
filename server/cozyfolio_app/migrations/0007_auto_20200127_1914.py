# Generated by Django 2.2 on 2020-01-28 03:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cozyfolio_app', '0006_remove_user_level'),
    ]

    operations = [
        migrations.RenameField(
            model_name='skill',
            old_name='frameWorks',
            new_name='frameworks',
        ),
    ]
