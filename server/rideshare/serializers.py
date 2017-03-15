from rest_framework import serializers
from rideshare.models import UserTest


class UserTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTest
        fields = ('id', 'firstname', 'lastname', 'email', 'password')

    def create(self, validated_data):
        return UserTest.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance
