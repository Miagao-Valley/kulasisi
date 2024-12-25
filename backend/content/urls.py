from django.urls import path

from . import views


urlpatterns = [
    path("languages/", views.ListLanguageView.as_view(), name="languages"),
    path(
        "languages/<str:code>/", views.RetrieveLanguageView.as_view(), name="language"
    ),
    path("phrase-entries/", views.ListCreatePhraseEntryView.as_view(), name="phrase_entries"),
    path(
        "phrase-entries/<int:phrase_entry_pk>/",
        views.RetrieveUpdateDestroyPhraseEntryView.as_view(),
        name="phrase_entry",
    ),
    path(
        "phrase-entries/<int:phrase_entry_pk>/history/",
        views.ListPhraseEntryHistoryView.as_view(),
        name="phrase_entry_history",
    ),
    path(
        "phrase-entries/<int:phrase_entry_pk>/votes/",
        views.ListCreateVoteView.as_view(),
        name="phrase_entry_votes",
    ),
    path(
        "translations/",
        views.ListCreateTranslationsView.as_view(),
        name="translations",
    ),
    path(
        "translations/<int:translation_pk>/",
        views.RetrieveUpdateDestroyTranslationsView.as_view(),
        name="translation",
    ),
    path(
        "translations/<int:translation_pk>/history/",
        views.ListTranslationHistoryView.as_view(),
        name="translation_history",
    ),
    path(
        "translations/<int:translation_pk>/votes/",
        views.ListCreateVoteView.as_view(),
        name="translations_votes",
    ),
]
