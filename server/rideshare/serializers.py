from rest_framework import serializers
from django.contrib.auth.models import User
from rideshare.models import *


class DaysSerializer(serializers.Serializer):
    monday = serializers.BooleanField()
    tuesday = serializers.BooleanField()
    wednesday = serializers.BooleanField()
    thursday = serializers.BooleanField()
    friday = serializers.BooleanField()
    saturday = serializers.BooleanField()
    sunday = serializers.BooleanField()

class PlannedTripSerializer(serializers.ModelSerializer):
    driver_days = DaysSerializer(many=False)
    class Meta:
        model = PlannedTrips
        fields = ('id','driver_email','driver_departure','driver_destination','driver_timeofdeparture','driver_days',)
    
    def create(self, validated_data):
        return PlannedTrips.objects.create(**validated_data)
        
class ProposedTripSerializer(serializers.ModelSerializer):
    rider_days = DaysSerializer(many=False)
    class Meta:
        model = ProposedTrips
        fields = ('id','rider_email','rider_departure','rider_destination','rider_timeofdeparture','rider_days',)
    
    def create(self, validated_data):
        return ProposedTrips.objects.create(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password',)

    def create(self, validated_data):
        return User.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance
        
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password',)
        
        
