from django.db.models.functions import Length
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dictionary.models import Word
from languages.models import Language
from django.contrib.auth import get_user_model
import random

from .models import WordleGame
from .serializers import WordleGameSerializer

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


class WordleGameView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, lang_code, word_length):
        if word_length < 3 or word_length > 7:
            return Response(
                {"message": "Invalid word length. Must be between 3 and 7."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        lang = get_object_or_404(Language, code=lang_code)

        game = WordleGame.objects.filter(
            player=request.user,
            lang=lang,
            word_length=word_length,
            game_status="playing",
        ).first()

        if not game:
            try:
                solution = get_random_solution(lang, word_length)
            except ValueError as e:
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            game = WordleGame.objects.create(
                solution=solution,
                player=request.user,
                lang=lang,
                word_length=word_length,
                game_status="playing",
            )

        serializer = WordleGameSerializer(game)
        return Response(serializer.data)

    def post(self, request, lang_code, word_length):
        if word_length < 3 or word_length > 7:
            return Response(
                {"message": "Invalid word length. Must be between 3 and 7."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        lang = get_object_or_404(Language, code=lang_code)

        game = WordleGame.objects.filter(
            player=request.user,
            lang=lang,
            word_length=word_length,
            game_status="playing",
        ).first()
        if not game:
            return Response(
                {"message": "Game not found."}, status=status.HTTP_404_NOT_FOUND
            )

        guess = request.data.get("guess")
        if not guess:
            return Response(
                {"message": "Guess is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            game.make_guess(guess)
        except ValueError as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = WordleGameSerializer(game)
        return Response(serializer.data)


class WordleGameStatsView(APIView):
    permission_classes = [IsAuthenticated]

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

        return Response(stats)
