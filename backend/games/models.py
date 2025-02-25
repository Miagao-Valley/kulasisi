from django.db import models
from django.contrib.auth import get_user_model
from languages.models import Language
from dictionary.models import Word

User = get_user_model()


class WordleGame(models.Model):
    GAME_STATUS_CHOICES = [
        ("playing", "Playing"),
        ("win", "Win"),
        ("lose", "Lose"),
    ]

    player = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="wordle_games"
    )
    lang = models.ForeignKey(
        Language, on_delete=models.CASCADE, related_name="wordle_games"
    )
    word_length = models.IntegerField(default=5)
    max_guesses = models.IntegerField(default=6)
    solution = models.CharField(max_length=5)
    guesses = models.JSONField(default=list)
    game_status = models.CharField(
        max_length=7, choices=GAME_STATUS_CHOICES, default="playing"
    )
    date_start = models.DateTimeField(auto_now_add=True)
    date_end = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Wordle Game {self.id} - {self.player} - {self.game_status}"

    def save(self, *args, **kwargs):
        self.solution = self.solution.upper()
        self.guesses = [guess.upper() for guess in self.guesses]
        super().save(*args, **kwargs)

    def make_guess(self, guess: str):
        guess = guess.upper()

        if len(self.guesses) >= self.max_guesses:
            raise ValueError("Game is over.")

        if len(guess) != self.word_length:
            raise ValueError("Guess must be the correct length.")

        if guess in self.guesses:
            raise ValueError("Guess already exists.")

        if not Word.objects.filter(lang=self.lang, word__iexact=guess).exists():
            raise ValueError("Guess must be a word in the dictionary.")

        self.guesses.append(guess)

        if guess == self.solution:
            self.game_status = "win"
        elif len(self.guesses) >= self.max_guesses:
            self.game_status = "lose"

        self.save()
