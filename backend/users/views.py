from django.shortcuts import get_object_or_404
from django.contrib.auth import update_session_auth_hash
from django.db.models import Count, Avg, Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, views
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import User
from .serializers import (
    UserSerializer,
    ChangeEmailSerializer,
    ChangePhoneNumberSerializer,
    ChangePasswordSerializer,
    DeleteUserSerializer,
)


class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["first_name", "last_name", "username"]
    ordering_fields = [
        "username",
        "reputation",
        "num_languages",
        "avg_proficiency",
        "text_entry_count",
        "translation_count",
        "vote_count",
        "date_joined",
        "last_login",
    ]
    ordering = ["username"]

    def get_queryset(self):
        queryset = super().get_queryset()
        base_points = Count("text_entries") + Count("translations")
        upvotes = Count("votes", filter=Q(votes__value=1)) * 10
        downvotes = Count("votes", filter=Q(votes__value=-1)) * -2
        queryset = queryset.annotate(
            reputation=base_points + upvotes + downvotes,
            num_languages=Count("language_proficiencies"),
            avg_proficiency=Avg("language_proficiencies__level"),
            text_entry_count=Count("text_entries"),
            translation_count=Count("translations"),
            vote_count=Count("votes")
        )
        return queryset


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RetrieveUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"


class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != self.request.user:
            raise PermissionDenied(
                detail="You do not have permission to update this account."
            )

        return user


class ChangeEmailView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != self.request.user:
            raise PermissionDenied(
                detail="You do not have permission to change this account's password."
            )

        serializer = ChangeEmailSerializer(
            data=request.data, context={"request": request}
        )

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)

        new_email = serializer.validated_data["new_email"]
        user.email = new_email
        user.save()

        return Response({"detail": "Email updated successfully."}, status=200)


class ChangePhoneNumberView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != self.request.user:
            raise PermissionDenied(
                detail="You do not have permission to change this account's password."
            )

        serializer = ChangePhoneNumberSerializer(
            data=request.data, context={"request": request}
        )

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)

        new_phone_number = serializer.validated_data["new_phone_number"]
        user.phone_number = new_phone_number
        user.save()

        return Response({"detail": "Phone number updated successfully."}, status=200)


class ChangePasswordView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != self.request.user:
            raise PermissionDenied(
                detail="You do not have permission to change this account's password."
            )

        serializer = ChangePasswordSerializer(
            data=request.data, context={"request": request}
        )

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)

        new_password = serializer.validated_data["new_password"]
        user.set_password(new_password)
        user.save()

        update_session_auth_hash(request, user)

        return Response({"detail": "Password changed successfully."}, status=200)


class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    lookup_field = "username"
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != self.request.user:
            raise PermissionDenied(
                detail="You do not have permission to delete this account."
            )

        return user

    def perform_destroy(self, instance):
        serializer = DeleteUserSerializer(data=self.request.data)

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)

        instance.delete()
        return Response({"detail": "User account deleted successfully."}, status=204)
