from django.urls import path

from . import views
from core.views import ListCreateVoteView


urlpatterns = [
    path("", views.ListCreateDictEntryView.as_view(), name="dict_entries"),
    path(
        "<int:dict_entry_pk>/",
        views.RetrieveUpdateDestroyDictEntryView.as_view(),
        name="dict_entry",
    ),
    path(
        "<int:dict_entry_pk>/history/",
        views.ListDictEntryHistoryView.as_view(),
        name="dict_entry_history",
    ),
    path(
        "<int:dict_entry_pk>/votes/",
        ListCreateVoteView.as_view(),
        name="dict_entry_votes",
    ),
]
