from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Language, TextEntry, Translation


admin.site.register(Language)
admin.site.register(TextEntry, SimpleHistoryAdmin)
admin.site.register(Translation, SimpleHistoryAdmin)
