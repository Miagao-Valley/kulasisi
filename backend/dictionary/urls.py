from django.urls import path
from . import views
from core.views import ListCreateVoteView

urlpatterns = [
    # Definitions
    path("definitions/", views.ListCreateDefinitionView.as_view(), name="defintion"),
    path("definitions/<int:definition_pk>/", views.RetrieveUpdateDestroyDefinitionView.as_view(), name="definition"),
    path("definitions/<int:definition_pk>/history/", views.ListDefinitionHistoryView.as_view(), name="definition_history"),
    path("definitions/<int:definition_pk>/votes/", ListCreateVoteView.as_view(), name="definition_votes"),

    # Parts of Speech
    path("parts-of-speech/", views.ListCreatePartOfSpeechView.as_view(), name="parts_of_speech"),
    path("parts-of-speech/<str:abbr>/", views.RetrieveUpdateDestroyPartOfSpeechView.as_view(), name="part_of_speech"),

    # Words
    path("", views.ListCreateWordView.as_view(), name="words"),
    path("<str:lang>/<str:word>/", views.RetrieveUpdateDestroyWordView.as_view(), name="word"),
    path("<str:lang>/<str:word>/history/", views.ListWordHistoryView.as_view(), name="word_history"),
    path("<str:lang>/<str:word>/votes/", ListCreateVoteView.as_view(), name="word_votes"),
]
