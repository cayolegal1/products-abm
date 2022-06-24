import random
from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status, mixins, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView

from users import serializers
from users.api.v1.serializers import ForgotPasswordSerializer, ResetPasswordSerializer, UserUpdateInfoSerializer, \
    ProfilePictureSerializer, ChangePasswordSerializer, PasscodeSerializer
from users.models import PasswordReset
from users.serializers import UserDetailSerializer

User = get_user_model()


class ForgotPassword(APIView):
    permission_classes = []

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.filter(email=request.data.get("email")).first()
            get_token = PasswordReset.objects.filter(user=user).first()

            if get_token:
                get_token.delete()

            reset_token = PasswordReset(
                user=user,
                pass_reset_token=random.randint(1000, 9999),
                expires_on=datetime.now() + timedelta(minutes=5)
            )
            reset_token.save()
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_200_OK)


class VerifyOTP(APIView):
    permission_classes = []

    def post(self, request):
        otp = request.data.get("otp", None)

        if otp is None:
            return Response("No OTP provided", status=status.HTTP_400_BAD_REQUEST)

        get_token = PasswordReset.objects.filter(pass_reset_token=otp, expires_on__gt=timezone.now()).first()

        if not get_token:
            return Response("Invalid or expired OTP", status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


class ResetPassword(APIView):
    permission_classes = []

    def post(self, request):
        otp = request.data.get("otp")
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            password = request.data.get("password")

            get_token = PasswordReset.objects.filter(pass_reset_token=otp).first()

            if not get_token:
                return Response("Bad OTP", status=status.HTTP_400_BAD_REQUEST)
            user = get_token.user
            user.set_password(password)
            user.save()
            get_token.delete()
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get("current_password")):
                raise ValidationError({'current_password': 'Current password does not match'})

            if serializer.data.get("new_password") != serializer.data.get("confirm_password"):
                raise ValidationError({'new_password': 'New and confirm password does not match'})
            user.set_password(serializer.data.get("new_password"))
            user.save()
            user_updated_data = UserDetailSerializer(instance=user, context={'request': request})
            return Response(user_updated_data.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000
