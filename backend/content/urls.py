from django.urls import path

from . import views


urlpatterns = [
    path("languages/", views.ListLanguageView.as_view(), name="languages"),
    path(
        "languages/<str:code>/", views.RetrieveLanguageView.as_view(), name="language"
    ),
    path("text-entries/", views.ListCreateTextEntryView.as_view(), name="text_entries"),
    path(
        "text-entries/<int:text_entry_pk>/",
        views.RetrieveUpdateDestroyTextEntryView.as_view(),
        name="text_entry",
    ),
    path(
        "text-entries/<int:text_entry_pk>/history/",
        views.ListTextEntryHistoryView.as_view(),
        name="text_entry_history",
    ),
    path(
        "text-entries/<int:text_entry_pk>/votes/",
        views.ListCreateVoteView.as_view(),
        name="text_entry_votes",
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
