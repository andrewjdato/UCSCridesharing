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
    rider_firstname = models.CharField(max_length=100)
    rider_lastname = models.CharField(max_length=100)
    rider_location = models.CharField(max_length=100)
    rider_destination = models.CharField(max_length=100)
    rider_timeofdeparture = models.CharField(max_length=100)

class RiderApproveTrip(models.Model):
    user_profile = models.ForeignKey(RideProfile,  on_delete=models.CASCADE)
    planned_trip = models.ForeignKey(PlannedTrips, on_delete=models.CASCADE)
    approve = models.BooleanField(default=False)
    
class DriverActive(models.Model):
    isactive = models.BooleanField(default=False)
    user_account = models.OneToOneField(User)
    driverod_email = models.CharField(max_length=100)
    driverod_departure = models.CharField(max_length=200)
    driverod_destination = models.CharField(max_length=200)
    driverod_timeofdeparture = models.CharField(max_length=10)
    riderod_email = models.CharField(max_length=100)
    
class RiderActive(models.Model):
    isactive = models.BooleanField(default=False)
    driverod_email = models.CharField(max_length=100)
    user_account = models.OneToOneField(User)
    driverod_active_profile = models.OneToOneField(DriverActive, blank=True, null=True)
    riderod_departure = models.CharField(max_length=200)
    riderod_destination = models.CharField(max_length=200)
