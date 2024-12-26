from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Phrase, Translation


admin.site.register(Phrase, SimpleHistoryAdmin)
admin.site.register(Translation, SimpleHistoryAdmin)
