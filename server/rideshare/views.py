from rest_framework import viewsets
from rideshare.models import UserTest
from rideshare.serializers import UserTestSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def user_registration(request):
    if request.method =='GET':
        snippets = UserTest.objects.all()
        serializer = UserTestSerializer(snippets, many=True)
        return Response(serializer.data)
    if request.method =='POST':
        serializer = UserTestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print("not valid")
        return Response(serializer.errors, status=400)