from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator


class UserTest(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
