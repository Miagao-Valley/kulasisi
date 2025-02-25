from django.urls import path
from . import views

urlpatterns = [
    path(
        "wordle/stats/", views.WordleGameStatsView.as_view(), name="wordle_game_stats"
    ),
    path(
        "wordle/<str:lang_code>/<int:word_length>/",
        views.WordleGameView.as_view(),
        name="wordle_game",
    ),
]
