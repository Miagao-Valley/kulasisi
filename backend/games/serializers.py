from rest_framework import serializers
from .models import WordleGame
from dictionary.models import Word


class WordleGameSerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(queryset=Word.objects.all(), slug_field="code")

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
