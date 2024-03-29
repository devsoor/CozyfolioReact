from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static, serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('cozyfolio_app.urls')),
    # re_path(r'^(?P<path>.*)$', serve, { 'document_root': settings.FRONTEND_ROOT }),
]

if settings:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
