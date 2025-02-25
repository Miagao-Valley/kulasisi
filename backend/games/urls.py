from django.urls import path
from .views import WordleGameView

urlpatterns = [
    path(
        "wordle/<str:lang_code>/<int:word_length>/",
        WordleGameView.as_view(),
        name="wordle_game",
    ),
]
