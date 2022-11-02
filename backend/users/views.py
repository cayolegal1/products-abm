from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, RedirectView, UpdateView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer

User = get_user_model()


class UserSetView(ModelViewSet):
    query_set = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()
