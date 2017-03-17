from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
import json
from django.contrib.auth.models import User

class PlannedTrips(models.Model):
    trip_id = models.PositiveIntegerField(blank=True, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    driver_email = models.CharField(max_length=100)
    driver_departure = models.CharField(max_length=200)
    driver_destination = models.CharField(max_length=200)
    driver_timeofdeparture = models.CharField(max_length=10)
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)
    def get_days(self):
        return json.loads(driver_days)
    
class ProposedTrips(models.Model):
    trip_id = models.PositiveIntegerField(blank=True, null=True)
    rider_email = models.CharField(max_length=100)
    rider_departure = models.CharField(max_length=200)
    rider_destination = models.CharField(max_length=200)
    rider_timeofdeparture = models.CharField(max_length=10)
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)
    
class RideProfile(models.Model):
    desired_trip = models.ManyToManyField(PlannedTrips)
    proposed_trip = models.ManyToManyField(ProposedTrips)
    user_account = models.OneToOneField(User)
    email = models.CharField(max_length=100)
    
class RiderJoin(models.Model):
    trip_id = models.IntegerField()
    email = models.CharField(max_length=100)
