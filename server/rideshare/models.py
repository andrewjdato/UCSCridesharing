from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

class PlannedTrips(models.Model):
    driver_email = models.CharField(max_length=100)
    driver_departure = models.CharField(max_length=200)
    driver_destination = models.CharField(max_length=200)
    driver_timeofdeparture = models.CharField(max_length=10)
    driver_days = models.CharField(max_length=150)
    driver_days_monday = models.BooleanField(default=False)
    driver_days_tuesday = models.BooleanField(default=False)
    driver_days_wednesday = models.BooleanField(default=False)
    driver_days_thursday = models.BooleanField(default=False)
    driver_days_friday = models.BooleanField(default=False)
    driver_days_saturday = models.BooleanField(default=False)
    driver_days_sunday = models.BooleanField(default=False)

