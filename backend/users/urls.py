from django.urls import path

from . import views


urlpatterns = [
    path("", views.ListUserView.as_view(), name="users"),
    path("<str:username>/", views.RetrieveUserView.as_view(), name="user"),
]
