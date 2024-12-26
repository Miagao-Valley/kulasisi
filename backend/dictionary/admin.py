from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import DictEntry, Definition


admin.site.register(DictEntry, SimpleHistoryAdmin)
admin.site.register(Definition, SimpleHistoryAdmin)
