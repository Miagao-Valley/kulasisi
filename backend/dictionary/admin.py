from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Word, Definition, PartOfSpeech


admin.site.register(Word, SimpleHistoryAdmin)
admin.site.register(Definition, SimpleHistoryAdmin)
admin.site.register(PartOfSpeech)
