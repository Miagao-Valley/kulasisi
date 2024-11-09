from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserCreationForm
    fieldsets = (
        *UserAdmin.fieldsets,
        (
            "Other",
            {
                "fields": (
                    "phone_number",
                    "date_of_birth",
                    "location",
                    "gender",
                    "bio",
                    "website",
                )
            },
        ),
    )


admin.site.register(User, CustomUserAdmin)
