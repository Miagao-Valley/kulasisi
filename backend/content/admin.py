from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Language, TextEntry


admin.site.register(Language)
admin.site.register(TextEntry, SimpleHistoryAdmin)
