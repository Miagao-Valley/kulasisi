from django.urls import path
from . import views

urlpatterns = [
    # Users
    path("", views.ListUserView.as_view(), name="users"),
    path("<str:username>/", views.RetrieveUserView.as_view(), name="user"),
    path("<str:username>/update/", views.UpdateUserView.as_view(), name="update_user"),
    path("<str:username>/delete/", views.DeleteUserView.as_view(), name="delete_user"),
    # User Settings
    path(
        "<str:username>/change-email/",
        views.ChangeEmailView.as_view(),
        name="change_email",
    ),
    path(
        "<str:username>/change-phone-number/",
        views.ChangePhoneNumberView.as_view(),
        name="change_phone_number",
    ),
    path(
        "<str:username>/change-password/",
        views.ChangePasswordView.as_view(),
        name="change_password",
    ),
]
