from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Word, Definition


admin.site.register(Word, SimpleHistoryAdmin)
admin.site.register(Definition, SimpleHistoryAdmin)
