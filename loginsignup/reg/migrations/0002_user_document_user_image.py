# Generated by Django 4.1.5 on 2023-09-02 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reg', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='document',
            field=models.FileField(default='default.pdf', upload_to='documents/'),
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(default='default_image.jpg', upload_to='images/'),
        ),
    ]
