from django.urls import path

from . import views
from core.views import ListCreateVoteView


urlpatterns = [
    path("", views.ListCreateDefinitionView.as_view(), name="defintion"),
    path(
        "<int:definition_pk>/",
        views.RetrieveUpdateDestroyDefinitionView.as_view(),
        name="definition",
    ),
    path(
        "<int:definition_pk>/history/",
        views.ListDefinitionHistoryView.as_view(),
        name="definition_history",
    ),
    path(
        "<int:definition_pk>/votes/",
        ListCreateVoteView.as_view(),
        name="definition_votes",
    ),
]
