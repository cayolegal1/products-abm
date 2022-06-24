from allauth.account.apps import AccountConfig
from allauth.socialaccount.apps import SocialAccountConfig
from django.apps import AppConfig


class HomeConfig(AppConfig):
    name = 'home'


class ModifiedAccountConfig(AccountConfig):
    default_auto_field = 'django.db.models.AutoField'


class ModifiedSocialAccountConfig(SocialAccountConfig):
    default_auto_field = 'django.db.models.AutoField'
