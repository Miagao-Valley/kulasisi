from django.urls import path

from . import views
from core.views import ListCreateVoteView


urlpatterns = [
    path("", views.ListCreateWordView.as_view(), name="words"),
    path(
        "<int:word_pk>/",
        views.RetrieveUpdateDestroyWordView.as_view(),
        name="word",
    ),
    path(
        "<int:word_pk>/history/",
        views.ListWordHistoryView.as_view(),
        name="word_history",
    ),
    path(
        "<int:word_pk>/votes/",
        ListCreateVoteView.as_view(),
        name="word_votes",
    ),
]
