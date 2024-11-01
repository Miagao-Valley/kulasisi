from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from math import ceil


class CustomPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):
        total_items = self.count
        total_pages = ceil(total_items / self.limit) if self.limit else 1
        next_link = self.get_next_link()
        previous_link = self.get_previous_link()

        return Response(
            {
                "num_pages": total_pages,
                "current_page": self.offset // self.limit + 1 if self.limit else 1,
                "count": total_items,
                "limit": self.limit,
                "next": (
                    {"offset": self.offset + self.limit, "link": next_link}
                    if next_link
                    else None
                ),
                "previous": (
                    {"offset": self.offset - self.limit, "link": previous_link}
                    if previous_link
                    else None
                ),
                "results": data,
            }
        )
