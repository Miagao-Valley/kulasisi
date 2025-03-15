from django.urls import path

from . import views


urlpatterns = [
    path("home-feed/", views.HomeFeedView.as_view(), name="home-feed"),
]
