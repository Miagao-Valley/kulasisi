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
    path(
        "text-entries/<int:pk>/history/",
        views.ListTextEntryHistoryView.as_view(),
        name="text_entry_history",
    ),
    path(
        "text-entries/<int:text_entry_pk>/translations/",
        views.ListCreateTranslationsView.as_view(),
        name="text_entry_translations",
    ),
    path(
        "text-entries/<int:text_entry_pk>/translations/<int:pk>/",
        views.RetrieveUpdateDestroyTranslationsView.as_view(),
        name="text_entry_translation",
    ),
    path(
        "text-entries/<int:text_entry_pk>/translations/<int:pk>/history/",
        views.ListTranslationHistoryView.as_view(),
        name="text_entry_translation_history",
    ),
]
