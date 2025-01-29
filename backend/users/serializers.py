from django.contrib.auth import authenticate, password_validation as validators
from django.core import exceptions
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from languages.models import LanguageProficiency
from languages.serializers import LanguageProficiencySerializer


class UserSerializer(serializers.ModelSerializer):
    language_proficiencies = LanguageProficiencySerializer(
        many=True, required=False, help_text="Language proficiencies for the user."
    )
    reputation = serializers.SerializerMethodField(
        help_text="The user's reputation score."
    )
    phrase_count = serializers.SerializerMethodField(
        help_text="Number of phrases created by the user."
    )
    translation_count = serializers.SerializerMethodField(
        help_text="Number of translations created by the user."
    )
    word_count = serializers.SerializerMethodField(
        help_text="Number of words created by the user."
    )
    definition_count = serializers.SerializerMethodField(
        help_text="Number of definitions created by the user."
    )
    vote_count = serializers.SerializerMethodField(
        help_text="Number of votes cast by the user."
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "date_of_birth",
            "location",
            "gender",
            "bio",
            "website",
            "reputation",
            "phrase_count",
            "translation_count",
            "word_count",
            "definition_count",
            "vote_count",
            "language_proficiencies",
            "last_login",
            "date_joined",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "last_login": {"read_only": True},
            "date_joined": {"read_only": True},
            "reputation": {"read_only": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
            "date_of_birth": {"required": True},
            "location": {"required": True},
        }

    def get_reputation(self, obj: User) -> int:
        return obj.get_reputation()

    def get_phrase_count(self, obj: User) -> int:
        return obj.phrases.count()

    def get_translation_count(self, obj: User) -> int:
        return obj.translations.count()

    def get_word_count(self, obj: User) -> int:
        return obj.words.count()

    def get_definition_count(self, obj: User) -> int:
        return obj.definitions.count()

    def get_vote_count(self, obj: User) -> int:
        return obj.votes.count()

    def validate(self, data):
        language_proficiencies_data = data.pop("language_proficiencies", [])

        user = User(**data)
        password = data.get("password")
        errors = {}

        if password:
            try:
                validators.validate_password(password=password, user=user)
            except exceptions.ValidationError as e:
                errors["password"] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        data["language_proficiencies"] = language_proficiencies_data

        return data

    def create(self, validated_data):
        language_proficiencies_data = validated_data.pop("language_proficiencies", [])

        user = User.objects.create_user(**validated_data)

        for proficiency_data in language_proficiencies_data:
            lang = proficiency_data.get("lang")

            if lang:
                LanguageProficiency.objects.create(
                    user=user,
                    lang=lang,
                    level=proficiency_data.get("level"),
                )

        return user

    def update(self, instance, validated_data):
        # Make 'email' and 'phone_number' fields immutable
        validated_data.pop("email", None)
        validated_data.pop("phone_number", None)

        language_proficiencies_data = validated_data.pop("language_proficiencies", [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        with transaction.atomic():
            instance.language_proficiencies.all().delete()

            for proficiency_data in language_proficiencies_data:
                lang = proficiency_data.get("lang")
                if lang:
                    LanguageProficiency.objects.create(
                        user=instance,
                        lang=lang,
                        level=proficiency_data.get("level"),
                    )

        return instance


class ChangeEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField(help_text="The new email address to update to.")
    password = serializers.CharField(
        write_only=True, help_text="The password to authenticate the email change."
    )

    def validate_new_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

    def validate_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("The provided password is incorrect.")
        return value


class ChangePhoneNumberSerializer(serializers.Serializer):
    new_phone_number = serializers.CharField(
        max_length=15, help_text="The new phone number to update to."
    )
    password = serializers.CharField(
        write_only=True,
        help_text="The password to authenticate the phone number change.",
    )

    def validate_new_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("This phone number is already in use.")
        return value

    def validate_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("The provided password is incorrect.")
        return value


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        write_only=True, help_text="The current password for authentication."
    )
    new_password = serializers.CharField(
        write_only=True, help_text="The new password to set."
    )

    def validate_current_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value):
        user = self.context["request"].user
        try:
            validators.validate_password(value, user)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value


class DeleteUserSerializer(serializers.Serializer):
    username = serializers.CharField(
        help_text="The username of the user to be deleted."
    )
    password = serializers.CharField(
        write_only=True, help_text="The password to authenticate the user deletion."
    )

    def validate_username(self, value):
        if not User.objects.filter(username=value).exists():
            raise serializers.ValidationError("The provided username does not exist.")
        return value

    def validate_password(self, value):
        username = self.initial_data.get("username")
        user = authenticate(username=username, password=value)
        if user is None:
            raise serializers.ValidationError("The provided password is incorrect.")
        return value


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token
