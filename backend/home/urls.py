from xml.etree.ElementInclude import include
from django.urls import path
from .views import home, list_products

urlpatterns = [
    path("", home, name="home"),
    path("products/", list_products)
]
