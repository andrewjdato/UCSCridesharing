from rest_framework import viewsets
from rideshare.serializers import *
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse

@api_view(['GET'])
@parser_classes((JSONParser,))
def get_all_planned_trips(request):
    tripset = PlannedTrips.objects.all()
    serializer = PlannedTripSerializer(tripset, many=True)
    print(serializer.data)
    return

@api_view(['POST'])
@parser_classes((JSONParser,))
def new_planned_trip(request):
    serializer = PlannedTripSerializer(data = request.data)
    #print(request.data)
    if serializer.is_valid():
        serializer.validated_data['monday'] = serializer.validated_data['driver_days'].get('monday')
        serializer.validated_data['tuesday'] = serializer.validated_data['driver_days'].get('tuesday')
        serializer.validated_data['wednesday'] = serializer.validated_data['driver_days'].get('wednesday')
        serializer.validated_data['thursday'] = serializer.validated_data['driver_days'].get('thursday')
        serializer.validated_data['friday'] = serializer.validated_data['driver_days'].get('friday')
        serializer.validated_data['saturday'] = serializer.validated_data['driver_days'].get('saturday')
        serializer.validated_data['sunday'] = serializer.validated_data['driver_days'].get('sunday')
        trip = serializer.save()
        #trip = PlannedTrips.objects.(driver_email=serializer.validated_data['driver_email'])
        user = User.objects.get(email = serializer.validated_data['driver_email'])
        trip.first_name = user.first_name
        trip.last_name = user.last_name
        trip.save()
        return JsonResponse(serializer.validated_data, status=201)
    print(serializer.errors)
    return JsonResponse(serializer.errors, status=400)
    
@api_view(['POST'])
@parser_classes((JSONParser,))
def new_proposed_trip(request):
    serializer = ProposedTripSerializer(data = request.data)
    #print(request.data)
    if serializer.is_valid():
        serializer.validated_data['monday'] = serializer.validated_data['rider_days'].get('monday')
        serializer.validated_data['tuesday'] = serializer.validated_data['rider_days'].get('tuesday')
        serializer.validated_data['wednesday'] = serializer.validated_data['rider_days'].get('wednesday')
        serializer.validated_data['thursday'] = serializer.validated_data['rider_days'].get('thursday')
        serializer.validated_data['friday'] = serializer.validated_data['rider_days'].get('friday')
        serializer.validated_data['saturday'] = serializer.validated_data['rider_days'].get('saturday')
        serializer.validated_data['sunday'] = serializer.validated_data['rider_days'].get('sunday')
        serializer.save()
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
