from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attr):
        email = attr.get("email", None)
        if email is None:
            raise serializers.ValidationError("Please enter avalid email")

        user = User.objects.filter(email=email).first()
        if not user:
            raise serializers.ValidationError("Email not recognized")

        return super().validate(attr)


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    password2 = serializers.CharField()

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password didn't match."})
        if len(attrs['password']) < 8:
            raise serializers.ValidationError({"password": "Password must be at least eight chars long."})

        return super().validate(attrs)


class UserUpdateInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'phone_number', 'line1', 'city', 'state', 'postal_code']


class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['profile_picture']


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)


class PasscodeSerializer(serializers.Serializer):
    passcode = serializers.CharField(required=True)

