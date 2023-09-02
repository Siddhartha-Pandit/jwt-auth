from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import usermanager
class User(AbstractUser):
    name=models.CharField(max_length=255)
    email=models.CharField(max_length=255,unique=True)
    image = models.ImageField(upload_to='media/images/',default='default_image.jpg')
    document = models.FileField(upload_to='media/documents/', default='default.pdf')

    username=None

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    objects=usermanager()

