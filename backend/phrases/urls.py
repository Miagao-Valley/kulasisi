from django.urls import path
from . import views
from core.views import ListCreateVoteView

urlpatterns = [
    # Translations
    path("translations/", views.ListCreateTranslationsView.as_view(), name="translations"),
    path("translations/<int:translation_pk>/", views.RetrieveUpdateDestroyTranslationsView.as_view(), name="translation"),
    path("translations/<int:translation_pk>/history/", views.ListTranslationHistoryView.as_view(), name="translation_history"),
    path("translations/<int:translation_pk>/votes/", ListCreateVoteView.as_view(), name="translations_votes"),

    # Categories
    path("categories/", views.ListCreateCategoryView.as_view(), name="categories"),
    path("categories/<str:name>/", views.RetrieveUpdateDestroyCategoryView.as_view(), name="category"),

    # Google Translate
    path("google-translate/", views.GoogleTranslateView.as_view(), name="google-translate"),

    # Phrases
    path("", views.ListCreatePhraseView.as_view(), name="phrases"),
    path("<int:phrase_pk>/", views.RetrieveUpdateDestroyPhraseView.as_view(), name="phrase"),
    path("<int:phrase_pk>/history/", views.ListPhraseHistoryView.as_view(), name="phrase_history"),
    path("<int:phrase_pk>/votes/", ListCreateVoteView.as_view(), name="phrase_votes"),
]
