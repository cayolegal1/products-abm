from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path("user/", include("users.api.v1.urls")),
    path('', include(router.urls))
]
