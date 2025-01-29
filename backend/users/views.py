from django.shortcuts import get_object_or_404
from django.contrib.auth import update_session_auth_hash
from django.db.models import Count, Avg, Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
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
        "phrase_count",
        "translation_count",
        "word_count",
        "definition_count",
        "vote_count",
        "date_joined",
        "last_login",
    ]
    ordering = ["username"]

    def get_queryset(self):
        queryset = super().get_queryset()

        # Annotate each language with reputations, language proficiencies, entry counts, and vote count.
        base_points = Count("phrases") + Count("translations")
        upvotes = Count("votes", filter=Q(votes__value=1)) * 10
        downvotes = Count("votes", filter=Q(votes__value=-1)) * -2
        queryset = queryset.annotate(
            reputation=base_points + upvotes + downvotes,
            num_languages=Count("language_proficiencies"),
            avg_proficiency=Avg("language_proficiencies__level"),
            phrase_count=Count("phrases"),
            translation_count=Count("translations"),
            word_count=Count("words"),
            definition_count=Count("definitions"),
            vote_count=Count("votes"),
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
            raise PermissionDenied(detail="You do not have permission to update this account.")

        return user


class ChangeEmailView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangeEmailSerializer

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != request.user:
            raise PermissionDenied(detail="You do not have permission to change this account's email.")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user.email = serializer.validated_data["new_email"]
        user.save()

        return Response({"new_email": user.email}, status=status.HTTP_200_OK)


class ChangePhoneNumberView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePhoneNumberSerializer

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != request.user:
            raise PermissionDenied(detail="You do not have permission to change this account's phone number.")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user.phone_number = serializer.validated_data["new_phone_number"]
        user.save()

        return Response({"new_phone_number": user.phone_number}, status=status.HTTP_200_OK)


class ChangePasswordView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != request.user:
            raise PermissionDenied(detail="You do not have permission to change this account's password.")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user.set_password(serializer.validated_data["new_password"])
        user.save()

        update_session_auth_hash(request, user)

        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)


class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = DeleteUserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "username"

    def get_object(self):
        user = get_object_or_404(User, username=self.kwargs["username"])

        if user != self.request.user:
            raise PermissionDenied(detail="You do not have permission to delete this account.")

        return user

    def perform_destroy(self, instance):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)

        instance.delete()
        return Response({"detail": "User account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
