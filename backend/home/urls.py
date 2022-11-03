from django.urls import path, include
from .views import home, ProductViewSet
from rest_framework.routers import DefaultRouter
from .views import ProductImageViewSet, ProductImagePost

router = DefaultRouter()

router.register("", ProductViewSet, basename="products")
router.register("images/", ProductImageViewSet, basename="productimages")

urlpatterns = [

    #path("", ProductViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'delete'}))
    path("", include(router.urls)),
    path("images/<int:id>/", ProductImageViewSet.as_view({'get': 'list'}), name="images"),

]
