# Generated by Django 2.2 on 2020-01-28 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cozyfolio_app', '0007_auto_20200127_1914'),
    ]

    operations = [
        migrations.AddField(
            model_name='skill',
            name='clouds',
            field=models.TextField(null=True),
        ),
    ]