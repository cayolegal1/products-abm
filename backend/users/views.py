from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, RedirectView, UpdateView
from rest_auth.registration.views import SocialLoginView
# from users.adapters import AppleLoginAdapter
# from home.api.v1.serializers import AppleLoginSerializer, CustomSocialLoginSerializer
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer

User = get_user_model()

#
# class AppleLogin(SocialLoginView):
#     # adapter_class = AppleOAuth2Adapter
#     adapter_class = AppleLoginAdapter
#     serializer_class = CustomSocialLoginSerializer
#     client_class = AppleOAuth2Client
#     callback_url = 'www.example.com'
#
#     def get_serializer(self, *args, **kwargs):
#         serializer_class = self.get_serializer_class()
#         kwargs['context'] = self.get_serializer_context()
#         return serializer_class(*args, **kwargs)
#
#
# class FacebookLogin(SocialLoginView):
#     adapter_class = FacebookOAuth2Adapter
#     serializer_class = CustomSocialLoginSerializer
#     callback_url = "https://foxycar-25191.botics.co/accounts/facebook/login/callback/"
#     client_class = OAuth2Client
#
#     def get_serializer(self, *args, **kwargs):
#         serializer_class = self.get_serializer_class()
#         kwargs['context'] = self.get_serializer_context()
#         return serializer_class(*args, **kwargs)
#
#
# class GoogleLogin(SocialLoginView):
#     adapter_class = GoogleOAuth2Adapter
#     serializer_class = CustomSocialLoginSerializer
#     callback_url = "localhost:8000"
#     client_class = OAuth2Client
#
#     def get_serializer(self, *args, **kwargs):
#         serializer_class = self.get_serializer_class()
#         kwargs['context'] = self.get_serializer_context()
#         return serializer_class(*args, **kwargs)
#

# class UserDetailView(LoginRequiredMixin, DetailView):
#     #model = User
#     slug_field = "username"
#     slug_url_kwarg = "username"


#user_detail_view = UserDetailView.as_view()


# class UserUpdateView(LoginRequiredMixin, UpdateView):
#     model = User
#     fields = ["name"]

#     def get_success_url(self):
#         return reverse("users:detail", kwargs={"username": self.request.user.username})

#     def get_object(self):
#         return User.objects.get(username=self.request.user.username)


# user_update_view = UserUpdateView.as_view()


# class UserRedirectView(LoginRequiredMixin, RedirectView):
#     permanent = False

#     def get_redirect_url(self):
#         return reverse("users:detail", kwargs={"username": self.request.user.username})


# user_redirect_view = UserRedirectView.as_view()



class UserSetView(ModelViewSet):
    query_set = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()
