from django.db.models.functions import Length
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dictionary.models import Word
from languages.models import Language
from django.contrib.auth import get_user_model
import random

from .models import WordleGame
from .serializers import (
    WordleGameSerializer,
    WordleGuessSerializer,
    WordleGameStatsSerializer,
)

User = get_user_model()


def get_random_solution(lang, word_length):
    words = (
        Word.objects.filter(lang=lang)
        .annotate(word_len=Length("word"))
        .filter(word_len=word_length)
    )

    if not words:
        raise ValueError("No words found for this language and word length.")

    solution = random.choice(words).word
    return solution.upper()


class WordleGameView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return WordleGuessSerializer
        return WordleGameSerializer

    def get(self, request, lang_code, word_length):
        lang = get_object_or_404(Language, code=lang_code)

        game, created = WordleGame.objects.get_or_create(
            player=request.user,
            lang=lang,
            word_length=word_length,
            game_status="playing",
            defaults={},
        )

        if created:
            game.solution = get_random_solution(lang, word_length)
            game.save()

        serializer = self.get_serializer(game)
        return Response(serializer.data)

    def post(self, request, lang_code, word_length):
        lang = get_object_or_404(Language, code=lang_code)
        game = get_object_or_404(
            WordleGame,
            player=request.user,
            lang=lang,
            word_length=word_length,
            game_status="playing",
        )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            game.make_guess(serializer.validated_data["guess"])
        except ValueError as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"game": WordleGameSerializer(game).data}, status=status.HTTP_200_OK
        )


class WordleGameStatsView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WordleGameStatsSerializer

    def get(self, request):
        lang_code = request.query_params.get("lang")
        word_length = int(request.query_params.get("len", 0))

        games = WordleGame.objects.filter(player=request.user)

        if lang_code:

            games = games.filter(lang__code=lang_code)

        if word_length:
            games = games.filter(word_length=word_length)

        games_won = games.filter(game_status="win").count()
        games_lost = games.filter(game_status="lose").count()
        games_played = games_won + games_lost
        win_rate = round(games_won / games_played, 2) if games_played else 0.0

        stats = {
            "total_games": games_played,
            "games_won": games_won,
            "games_lost": games_lost,
            "win_rate": win_rate,
        }

        serializer = self.serializer_class(stats)
        return Response(serializer.data)
