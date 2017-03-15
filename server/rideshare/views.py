from rest_framework import viewsets
from rideshare.serializers import UserRegSerializer
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def user_registration(request):
    if request.method =='POST':
        serializer = UserRegSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['username'] = serializer.validated_data['email']
            serializer.save()
            return Response(serializer.data, status=201)
        print("not valid")
        return Response(serializer.errors, status=400)
        
@api_view(['GET'])
def user_login(request):
    if request.method =='GET':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            return Response(serializer.data, status=201)