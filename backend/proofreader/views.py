from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProofreaderSerializer, ProofreaderLanguagesSerializer
from .proofreader import proofread_text, SUPPORTED_LANGUAGES


class ProofreaderView(GenericAPIView):
    """
    View for proofreading text.
    """

    serializer_class = ProofreaderSerializer

    def get_queryset(self):
        return []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data

        text = validated_data["text"]
        lang = validated_data["lang"]

        try:
            flagged_tokens, stats = proofread_text(text, lang)
            return Response(
                {"flagged_tokens": flagged_tokens, "stats": stats},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProofreaderLanguagesView(GenericAPIView):
    """
    View for listing supported languages in the proofreader.
    """

    serializer_class = ProofreaderLanguagesSerializer

    def get(self, request, *args, **kwargs):
        return Response(
            SUPPORTED_LANGUAGES,
            status=status.HTTP_200_OK,
        )
