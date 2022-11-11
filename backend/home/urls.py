from django.urls import path, include
from .views import home, ProductViewSet
from rest_framework.routers import DefaultRouter
from .views import ProductImageViewSet, upload_images, ProductImagePost

router = DefaultRouter()

router.register("", ProductViewSet, basename="products")

urlpatterns = [
    path("updload_images/", view=ProductImagePost.as_view(), name='product-images'),
    path("", include(router.urls)),
    path("<int:id>/images/", ProductImageViewSet.as_view({'get': 'list'}), name="images"),
]
