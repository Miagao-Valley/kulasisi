from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import User
from .serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["is_staff"]
    search_fields = ["first_name", "last_name", "username"]
    ordering_fields = [
        "username",
        "date_joined",
        "last_login",
    ]
    ordering = ["username"]


class RetrieveUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"
