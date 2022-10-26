from rest_framework.viewsets import ModelViewSet
from home.models import Product

class ProductAPI(ModelViewSet):
    #serializer_class =
    queryset = Product.objects.all()