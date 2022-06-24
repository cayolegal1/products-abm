from cities_light.models import Region
from rest_framework import serializers

from home.models import Feedback
from users.models import User


class ContactUserSerializer(serializers.Serializer):
    id = serializers.CharField()
    phone_number = serializers.CharField(allow_blank=True, allow_null=True)
    email = serializers.CharField(allow_blank=True, allow_null=True)
    name = serializers.CharField(allow_null=True)
    exists = serializers.BooleanField(default=False, allow_null=True)
    image = serializers.CharField(allow_blank=True, allow_null=True)


class OrederdContactUserSerializer(serializers.Serializer):
    title = serializers.CharField()
    data = ContactUserSerializer(many=True)


class ContactUserFoundSerializer(serializers.Serializer):
    id = serializers.CharField()
    phone_number = serializers.CharField(allow_blank=True, allow_null=True)
    email = serializers.CharField(allow_blank=True, allow_null=True)
    name = serializers.CharField()
    exists = serializers.BooleanField(default=False)
    image = serializers.ImageField(allow_null=True)


class OrederdContactUserFoundSerializer(serializers.Serializer):
    title = serializers.CharField()
    data = ContactUserFoundSerializer(many=True)


class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Feedback
        fields = ['feedback_topic', 'feedback_description', 'user']


class ContactUserEmailSerializer(serializers.Serializer):
    id = serializers.CharField()
    email = serializers.EmailField()
    name = serializers.CharField()


class ContactUserVerifiedSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'profile_picture']

    def get_name(self, obj):
        return obj.get_full_name()


class StateSerializerList(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()


    class Meta:
        model = Region
        fields = ['id', 'title', 'description']

    def get_title(self, obj):
        return obj.geoname_code

    def get_description(self, obj):
        return obj.name
