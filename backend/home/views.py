from django.shortcuts import HttpResponse, render
from django.views.decorators.csrf import csrf_protect
from home.models import Product, ProductImage
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from home.api.serializers import ProductSerializer, ProductImagesSerializer, ProductImageSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

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

    serializer_class = ProductImagesSerializer
    def get_queryset(self):

        return ProductImage.objects.filter(product = self.kwargs['id'])

@api_view(['POST'])
def upload_images(request):
    if request.method == "POST":
       for i in request.data:
           if(i != 'productId'):
                ProductImage.objects.create(product_id = request.data.get('productId'), image = request.data.get(i))
       return Response('Created', status = status.HTTP_201_CREATED)
    return Response('Not found', status=status.HTTP_400_BAD_REQUEST)

