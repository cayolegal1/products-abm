from django.shortcuts import HttpResponse, render
from home.models import Product, ProductImage
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from home.api.serializers import ProductSerializer, ProductImageSerializer
from rest_framework.response import Response
from rest_framework import status

def home(request):
    packages = [
	{'name':'django-allauth', 'url': 'https://pypi.org/project/django-allauth/0.38.0/'},
	{'name':'django-bootstrap4', 'url': 'https://pypi.org/project/django-bootstrap4/0.0.7/'},
	{'name':'djangorestframework', 'url': 'https://pypi.org/project/djangorestframework/3.9.0/'},
    ]
    context = {
        'packages': packages
    }
    return render(request, 'home/index.html', context)


class ProductViewSet(ModelViewSet):

    serializer_class = ProductSerializer
    def get_queryset(self):
        return Product.objects.all()

class ProductImageViewSet(ModelViewSet):

    serializer_class = ProductImageSerializer
    def get_queryset(self):

        return ProductImage.objects.filter(product = self.kwargs['id'])


class ProductImagePost(APIView):
    def post(self, request):

        productId = request.data.get('id')
        images = request.data.get('images')

        for image in images:
            ProductImage.objects.create(product = productId, image = image)

        return Response('Imagenes creadas', status = status.HTTP_200_OK)



    