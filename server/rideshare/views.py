from rest_framework import viewsets
from rideshare.serializers import *
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import *

@api_view(['POST'])
@parser_classes((JSONParser,))
def get_riders_on_trip(request):
    jsonobj = json.loads(request.body)
    email = jsonobj['email']
    trip_id = jsonobj['trip_id']
    return Response(status=201)

@api_view(['POST'])
@parser_classes((JSONParser,))
def get_driver_planned_trips(request):
    jsonobj = json.loads(request.body)
    tripset = PlannedTrips.objects.filter(driver_email=jsonobj['email'])
    if tripset is None:
        return Response(status=400)
    serializer = PlannedTripSerializer(tripset, many=True)
    return JsonResponse(serializer.data, safe=False, status=201)

@api_view(['POST'])
@parser_classes((JSONParser,))
def ride_join_trip(request):
    jsonobj = json.loads(request.body)
    trip = PlannedTrips.objects.get(trip_id=jsonobj['trip_id'])
    if trip is None:
        return Response(status=400)
    rider_profile = RideProfile.objects.get(email = jsonobj['email'])
    rider_profile.desired_trip.add(trip)
    rider_profile.save()
    rider_approve_trip = RiderApproveTrip.objects.create(user_profile = rider_profile, planned_trip = trip, approve = False)
    rider_approve_trip.save()
    return JsonResponse(jsonobj, status=201)

@api_view(['GET'])
@parser_classes((JSONParser,))
def get_all_planned_trips(request):
    tripset = PlannedTrips.objects.all()
    serializer = PlannedTripSerializer(tripset, many=True)
    return JsonResponse(serializer.data, safe=False, status=201)

@api_view(['POST'])
@parser_classes((JSONParser,))
def new_planned_trip(request):
    serializer = PlannedTripSerializer(data = request.data)
    #print(request.data)
    if serializer.is_valid():
        trip = serializer.save()
        #trip = PlannedTrips.objects.(driver_email=serializer.validated_data['driver_email'])
        user = User.objects.get(email = serializer.validated_data['driver_email'])
        trip.first_name = user.first_name
        trip.last_name = user.last_name
        trip.trip_id = 1
        trip.save()
        trip.trip_id = trip.id
        trip.save()
        return JsonResponse(serializer.validated_data, status=201)
    print(serializer.errors)
    return JsonResponse(serializer.errors, status=400)
    
@api_view(['POST'])
@parser_classes((JSONParser,))
def new_proposed_trip(request):
    jsonobj = json.loads(request.body)
    serializer = ProposedTripSerializer(data = request.data)
    #print(request.data)
    if serializer.is_valid():
        trip = serializer.save()
        trip.trip_id = 1
        trip.save()
        trip.trip_id = trip.id
        trip.save()
        # rider_email  rider_departure rider_destination rider_timeofdeparture
        riderprofile = RideProfile.objects.get(email = jsonobj['rider_email'])
        riderprofile.rider_location = jsonobj['rider_departure']
        riderprofile.rider_destination = jsonobj['rider_destination']
        riderprofile.rider_timeofdeparture = jsonobj['rider_timeofdeparture']
        riderprofile.rider_firstname = riderprofile.user_account.first_name
        riderprofile.rider_lastname = riderprofile.user_account.last_name
        riderprofile.save()
        return JsonResponse(serializer.validated_data, status=201)
    print(serializer.errors)
    return JsonResponse(serializer.errors, status=400)

@api_view(['POST'])
def user_registration(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['username'] = serializer.validated_data['email']
        serializer.save()
        user = User.objects.get(username= serializer.validated_data['username'])
        user.set_password(serializer.validated_data['password'])
        user.save()
        rider_profile = RideProfile.objects.create(email = serializer.validated_data['email'],user_account=user)
        rider_profile.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
        
@api_view(['POST'])
@parser_classes((JSONParser,))
def user_login(request):
    json_data = JSONParser().parse(request)
    serializer = UserLoginSerializer(data=json_data)
    #check if email is an email
    if serializer.is_valid():
        try:
            user = authenticate(username=serializer.validated_data['email'], password=serializer.validated_data['password'])
            serializer = UserSerializer(user)
            print(serializer.data)
            return JsonResponse(serializer.data, status=201)
        except User.DoesNotExist:
            return Response(serializer.data, status=400)
