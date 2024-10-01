from django.urls import path

from . import views


urlpatterns = [
    path("languages/", views.ListLanguageView.as_view(), name="languages"),
    path(
        "languages/<str:code>/", views.RetrieveLanguageView.as_view(), name="language"
    ),
    path("text-entries/", views.ListCreateTextEntryView.as_view(), name="text_entries"),
    path(
        "text-entries/<int:pk>/",
        views.RetrieveUpdateDestroyTextEntryView.as_view(),
        name="text_entry",
    ),
]
