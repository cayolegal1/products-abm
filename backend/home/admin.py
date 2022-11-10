from django.contrib import admin
from home.models import Product, ProductImage
class ProductAdmin(admin.ModelAdmin):
    
    list_display = ['id', 'code', 'name', 'description' ]

admin.site.register(Product, ProductAdmin)


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['get_id', 'get_name','image']

    def get_name(self, obj):
        return obj.product.name

    get_name.short_description = 'Product Name'
    get_name.admin_order_field = 'Product Image'

    def get_id(self, obj):
        return obj.product.id

    get_id.short_description = 'Product ID'

admin.site.register(ProductImage, ProductImageAdmin)