from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Language, LanguageProficiency, TextEntry, Translation, Vote


admin.site.register(Language)
admin.site.register(LanguageProficiency)
admin.site.register(TextEntry, SimpleHistoryAdmin)
admin.site.register(Translation, SimpleHistoryAdmin)
admin.site.register(Vote)
