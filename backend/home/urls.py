from xml.etree.ElementInclude import include
from django.urls import path
from .views import home, ProductViewSet

urlpatterns = [

    path("/", ProductViewSet.as_view({'get': 'list'}))
]
