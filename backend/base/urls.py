"""base URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
import re

from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView
from allauth.account.views import confirm_email
from rest_framework import permissions, routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from users.views import LoginView
from home.views import upload_images
# from home.views import ProductImagePost


router = routers.DefaultRouter()

urlpatterns = [
    path("test/", upload_images, name='test'),
    path("products/", include("home.urls") ),
    # path("images/", ProductImagePost.as_view(), name='postimages'),
    path("accounts/", include("allauth.urls")),
    path("api/v1/", include("home.api.v1.urls")),
    path("admin/", admin.site.urls),
    path("users/", include("users.urls", namespace="users")),
    path('login/', LoginView.as_view(), name='login'),
    #path('login', include(router.urls)),
    path("rest-auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("rest-auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
]

admin.site.site_header = "Tu hermana"
admin.site.site_title = "Tu hermana Admin Portal"
admin.site.index_title = "Tu hermana Admin"

# swagger
api_info = openapi.Info(
    title="Tu hermana API",
    default_version="v1",
    description="API documentation for Purple Lab App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs")
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + \
               static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# TODO remove this serve
urlpatterns += [re_path(r'^%s(?P<path>.*)$' % re.escape('/saas/'.lstrip('/')), serve, kwargs=dict(document_root=os.path.join(settings.STATIC_ROOT, 'saas')))]
urlpatterns += [path("", TemplateView.as_view(template_name='index.html'))]

