from django.db.models import Count, Avg, Case, When, Value, IntegerField, FloatField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter


from .models import Language
from .serializers import LanguageSerializer


class ListLanguageView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["code", "name"]
    ordering_fields = [
        "name",
        "user_count",
        "avg_proficiency",
        "phrase_count",
        "translation_count",
        "word_count",
        "definition_count",
    ]
    ordering = ["code"]

    def get_queryset(self):
        queryset = super().get_queryset()

        # Annotate each language with language proficiencies and entry counts.
        queryset = queryset.annotate(
            user_count=Count("proficiencies"),
            avg_proficiency=Coalesce(
                Avg(
                    Case(
                        When(proficiencies__level=1, then=Value(1)),
                        When(proficiencies__level=2, then=Value(2)),
                        When(proficiencies__level=3, then=Value(3)),
                        When(proficiencies__level=4, then=Value(4)),
                        When(proficiencies__level=5, then=Value(5)),
                        default=Value(0),
                        output_field=IntegerField(),
                    )
                ),
                Value(0),
                output_field=FloatField(),
            ),
            phrase_count=Count("phrases"),
            translation_count=Count("translations"),
            word_count=Count("words"),
            definition_count=Count("definitions"),
        )

        return queryset


class RetrieveLanguageView(generics.RetrieveAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    lookup_field = "code"
