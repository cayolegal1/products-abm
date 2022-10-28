from django.contrib import admin
from home.models import Product


class ProductAdmin(admin.ModelAdmin):
    
    list_display = ['code', 'name', 'description' ]

admin.site.register(Product, ProductAdmin)