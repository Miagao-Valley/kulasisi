from django.urls import path

from . import views
from core.views import ListCreateVoteView


urlpatterns = [
    path("", views.ListCreatePhraseEntryView.as_view(), name="phrase_entries"),
    path(
        "<int:phrase_entry_pk>/",
        views.RetrieveUpdateDestroyPhraseEntryView.as_view(),
        name="phrase_entry",
    ),
    path(
        "<int:phrase_entry_pk>/history/",
        views.ListPhraseEntryHistoryView.as_view(),
        name="phrase_entry_history",
    ),
    path(
        "<int:phrase_entry_pk>/votes/",
        ListCreateVoteView.as_view(),
        name="phrase_entry_votes",
    ),
]
