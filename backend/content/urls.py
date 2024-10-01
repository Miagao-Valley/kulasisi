from django.urls import path

from . import views


urlpatterns = [
    path("languages/", views.ListLanguageView.as_view(), name="languages"),
    path(
        "languages/<str:code>/", views.RetrieveLanguageView.as_view(), name="language"
    ),
]
