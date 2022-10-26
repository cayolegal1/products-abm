from django.contrib import admin
from home.models import Product


class ProductAdmin(admin.ModelAdmin):
    
    list_display = ['Codigo', 'Descripcion' ]

admin.site.register(Product, ProductAdmin)