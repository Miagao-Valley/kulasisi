from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import WordleGame
from dictionary.models import Language

User = get_user_model()


class WordleGameSerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code"
    )
    player = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username"
    )

    class Meta:
        model = WordleGame
        fields = [
            "id",
            "player",
            "lang",
            "word_length",
            "max_guesses",
            "solution",
            "guesses",
            "game_status",
            "date_start",
            "date_end",
        ]


class WordleGuessSerializer(serializers.Serializer):
    guess = serializers.CharField(
        min_length=3, max_length=7, required=True, write_only=True
    )
    game = WordleGameSerializer(read_only=True)


class WordleGameStatsSerializer(serializers.Serializer):
    total_games = serializers.IntegerField()
    games_won = serializers.IntegerField()
    games_lost = serializers.IntegerField()
    win_rate = serializers.FloatField()
