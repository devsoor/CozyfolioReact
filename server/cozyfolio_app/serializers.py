from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from .models import User, Portfolio, Project, Skill, SocialMedia, Job

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User 
        fields = ('firstName', 'lastName', 'email', 'password', 'address', 'country','state', 'city', 'zipCode', 'title', 'profileHighlight', 'resume','tagLine', 'headshot')


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]


class PortfolioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Portfolio
    fields = ('name', 'title', 'portfolioSummary', 'resume', 'created_at', 'updated_at')