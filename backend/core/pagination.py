from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from math import ceil


class CustomPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):

        return Response(
            {
                "pagination": {
                    "num_pages": ceil(self.count / self.limit) if self.limit else 1,
                    "current_page": self.offset // self.limit + 1 if self.limit else 1,
                    "count": self.count,
                    "next": self.get_next_link(),
                    "previous": self.get_previous_link(),
                },
                "results": data,
            }
        )
