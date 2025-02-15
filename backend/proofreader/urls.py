from django.urls import path
from . import views

urlpatterns = [
    path("", views.ProofreaderView.as_view(), name="proofreader"),
    path(
        "languages/",
        views.ProofreaderLanguagesView.as_view(),
        name="proofreader-languages",
    ),
]
