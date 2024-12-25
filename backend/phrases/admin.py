from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import PhraseEntry, Translation


admin.site.register(PhraseEntry, SimpleHistoryAdmin)
admin.site.register(Translation, SimpleHistoryAdmin)
