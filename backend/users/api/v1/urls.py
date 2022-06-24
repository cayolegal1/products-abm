from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from users.api.v1 import views
router = DefaultRouter()

urlpatterns = [
    path("forgot-password/", views.ForgotPassword.as_view(), name="forgot_password"),
    path("verify-otp/", views.VerifyOTP.as_view(), name="verify_otp"),
    path("reset-password/", views.ResetPassword.as_view(), name="reset_password"),
    path("change-password/", views.ChangePasswordView.as_view(), name="change_password"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
