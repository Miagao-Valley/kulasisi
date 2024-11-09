import django.contrib.auth.password_validation as validators
from django.core import exceptions
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User

from content.serializers import LanguageProficiencySerializer


class UserSerializer(serializers.ModelSerializer):
    language_proficiencies = LanguageProficiencySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "phone_number",
            "date_of_birth",
            "location",
            "gender",
            "bio",
            "website",
            "last_login",
            "date_joined",
            "language_proficiencies",
        ]
        extra_kwargs = {
            "last_login": {"read_only": True},
            "date_joined": {"read_only": True},
            "password": {"write_only": True},
        }

    def validate(self, data):
        user = User(**data)

        password = data.get("password")

        errors = dict()
        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors["password"] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(UserSerializer, self).validate(data)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token
