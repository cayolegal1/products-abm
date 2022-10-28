from django.urls import path, include
from .views import home, ProductViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("", ProductViewSet, basename="products")

urlpatterns = [

    #path("", ProductViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'delete'}))
    path("", include(router.urls))
]
