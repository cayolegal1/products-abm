from rest_framework import serializers
from home.models import Product

class ProductSerializer(serializers.Serializer):
    Codigo = serializers.CharField(allow_blank=True, allow_null=True)
    Descripcion = serializers.TextField(allow_blank=True, allow_null=True)
    Estado = serializers.CharField(allow_blank=True, allow_null=True)
    Imagenes = serializers.URLField(upload_to='product-images')
