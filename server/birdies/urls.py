from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from .birds.views import BirdViewSet
router = routers.DefaultRouter()
router.register(r'birds', BirdViewSet, basename='birds')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls))
]
