from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index),	   
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),   
    path('portfolio', views.PortfolioList.as_view()),
    path('portfolio/<int:pk>', views.PortfolioDetail.as_view()),
    path('project', views.ProjectList.as_view()),
    path('project/<int:pk>', views.ProjectDetail.as_view()),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)