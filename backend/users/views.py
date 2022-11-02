from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, RedirectView, UpdateView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer

User = get_user_model()


class UserSetView(ModelViewSet):
    query_set = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()

class LoginView(APIView):

    def __init__(self) -> None:
        pass

    def post(self, request):
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(username = username, password = password)
        
        if(user):
            login(request, user)
            token = Token.objects.get_or_create(user=user)
            user_response = UserSerializer(User.objects.get( username = username )).data
            
            return Response( 
                user_response,
                status = status.HTTP_200_OK
            )
        
        return Response( status = status.HTTP_404_NOT_FOUND )
