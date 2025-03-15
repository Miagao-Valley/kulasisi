import math
from datetime import datetime, timezone
from django.utils import timezone as dj_timezone


# Define a timezone-aware Unix epoch
EPOCH = datetime(1970, 1, 1, tzinfo=timezone.utc)

DECAY_FACTOR = 45000  # Decay factor (~12.5 hours)


def hot_score(upvotes, downvotes, created_at):
    """
    Calculates the hot ranking score based on net votes and the post's age.
    A logarithmic scale is used for vote score, and the created_at timestamp
    is adjusted relative to the Unix epoch.

    This implementation is based on Reddit's "hot" ranking algorithm.
    Source: https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
    """
    score = upvotes - downvotes
    sign = 1 if score > 0 else -1 if score < 0 else 0
    order = math.log(max(abs(score), 1), 10)

    # Ensure created_at is timezone-aware
    if created_at.tzinfo is None:
        created_at = dj_timezone.make_aware(created_at, timezone.utc)

    epoch_seconds = (created_at - EPOCH).total_seconds()

    return round(sign * order + epoch_seconds / DECAY_FACTOR, 2)
