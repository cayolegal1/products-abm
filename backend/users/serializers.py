import datetime

from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer, LoginSerializer
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

#User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('first_name', 'email', 'last_name', 'password', 'password_confirm', 'phone_number')

        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'password_confirm': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            },
            'phone_number': {
                'required': True,
                'allow_blank': False,
            },
            'first_name': {
                'required': True,
                'allow_blank': False,
            },
            'last_name': {
                'required': True,
                'allow_blank': False,
            },
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise ValidationError({'password': 'Passwords do not match'})
        return attrs

    def create(self, validated_data):

        user = User.objects.create(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone_number=validated_data["phone_number"],
            username=generate_unique_username([
                validated_data.get('first_name'),
                validated_data.get('last_name'),
                validated_data.get('email'),
                'user'
            ]),
            email=validated_data['email'],
        )
        password = validated_data['password']
        user.set_password(password)
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'email', 'name']


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm


class AuthSerializer(LoginSerializer):
    username = None


class UserDetailSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    email_verified = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email_verified', 'first_name', 'last_name',  'email', 'token', 'username', 'phone_number', 'profile_picture', ]

    def get_email_verified(self, obj):
        return obj.emailaddress_set.get(primary=True).verified

    def get_token(self, obj):
        refresh = TokenObtainPairSerializer.get_token(obj)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class AuthTokenSerializer(UserDetailSerializer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        token_instance = self.instance
        profile = token_instance.user
        self.instance = profile



class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'
        
        def create(self, validated_data):

            user = User.objects.create(
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                phone_number=validated_data["phone_number"],
                username=generate_unique_username([
                    validated_data.get('first_name'),
                    validated_data.get('last_name'),
                    validated_data.get('email'),
                    'user'
                ]),
                email=validated_data['email'],
            )
            password = validated_data['password']
            user.set_password(password)
            user.save()
            return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()

