from django.urls import path

from . import views


urlpatterns = [
    path("", views.ListLanguageView.as_view(), name="languages"),
    path(
        "<str:code>/", views.RetrieveLanguageView.as_view(), name="language"
    ),
]