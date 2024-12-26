from django.urls import path

from . import views
from core.views import ListCreateVoteView


urlpatterns = [
    path("", views.ListCreatePhraseView.as_view(), name="phrases"),
    path(
        "<int:phrase_pk>/",
        views.RetrieveUpdateDestroyPhraseView.as_view(),
        name="phrase",
    ),
    path(
        "<int:phrase_pk>/history/",
        views.ListPhraseHistoryView.as_view(),
        name="phrase_history",
    ),
    path(
        "<int:phrase_pk>/votes/",
        ListCreateVoteView.as_view(),
        name="phrase_votes",
    ),
]
