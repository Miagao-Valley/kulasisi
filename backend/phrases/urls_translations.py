from django.urls import path

from . import views
from core.views import ListCreateVoteView


urlpatterns = [
    path(
        "",
        views.ListCreateTranslationsView.as_view(),
        name="translations",
    ),
    path(
        "<int:translation_pk>/",
        views.RetrieveUpdateDestroyTranslationsView.as_view(),
        name="translation",
    ),
    path(
        "<int:translation_pk>/history/",
        views.ListTranslationHistoryView.as_view(),
        name="translation_history",
    ),
    path(
        "<int:translation_pk>/votes/",
        ListCreateVoteView.as_view(),
        name="translations_votes",
    ),
]
