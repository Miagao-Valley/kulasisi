from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import DictEntry


admin.site.register(DictEntry, SimpleHistoryAdmin)
