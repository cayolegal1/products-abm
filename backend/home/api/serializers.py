from rest_framework import serializers
from home.models import Product, ProductImage

# class ProductSerializer(serializers.Serializer):
#     Codigo = serializers.CharField(allow_blank=True, allow_null=True)
#     Descripcion = serializers.CharField(allow_blank=True, allow_null=True)
#     Estado = serializers.CharField(allow_blank=True, allow_null=True)
#     Imagenes = serializers.ImageField(allow_null=True)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

