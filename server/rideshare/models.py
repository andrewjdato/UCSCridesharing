from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

class PlannedTrips(models.Model):
    driver_email = models.CharField(max_length=100)
    driver_departure = models.CharField(max_length=200)
    driver_destination = models.CharField(max_length=200)
    driver_timeofdeparture = models.CharField(max_length=10)
    driver_days = models.CharField(max_length=150)
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)

