from django.urls import path, include
from .views import home, ProductViewSet
from rest_framework.routers import DefaultRouter
from .views import ProductImageViewSet, upload_images

router = DefaultRouter()

router.register("", ProductViewSet, basename="products")

urlpatterns = [

    #path("", ProductViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'delete'}))
    path("test/", upload_images, name="test"),
    path("", include(router.urls)),
    path("<int:id>/images/", ProductImageViewSet.as_view({'get': 'list'}), name="images"),


]
