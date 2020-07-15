from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from .models import User, Portfolio, Project, Member, Skill, SocialMedia, Job, Picture, Video


class MemberSerializer(serializers.ModelSerializer):
  class Meta:
    model = Member
    fields = ('id', 'name', 'project', 'created_at', 'updated_at')

class PictureSerializer(serializers.ModelSerializer):
  class Meta:
    model = Picture
    fields = ('id', 'picfile', 'project', 'created_at', 'updated_at')

class VideoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Video
    fields = ('id', 'name', 'videofile', 'project', 'created_at', 'updated_at')

class ProjectSerializer(serializers.ModelSerializer):
  # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
  # portfolio = serializers.PrimaryKeyRelatedField(queryset=Portfolio.objects.all(), many=True)
  
  members = MemberSerializer(many=True, read_only=True)
  pictures = PictureSerializer(many=True, read_only=True)
  video = VideoSerializer(many=True, read_only=True)

  class Meta:
    model = Project
    fields = ('id', 'name', 'summary', 'techUsed', 'process', 'url', 'members', 'pictures', 'video', 'user', 'created_at', 'updated_at')

class PortfolioSerializer(serializers.ModelSerializer):
  # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
  project = ProjectSerializer(many=True, read_only=True)
  class Meta:
    model = Portfolio
    fields = ('id', 'name', 'title', 'portfolioSummary', 'resume', 'user', 'projects', 'created_at', 'updated_at')

class UserSerializer(serializers.ModelSerializer):
  portfolio = serializers.PrimaryKeyRelatedField(many=True, queryset=Portfolio.objects.all())
  project = serializers.PrimaryKeyRelatedField(many=True, queryset=Project.objects.all())

  class Meta:
      model = User
      fields = ['id', 'username', 'email', 'portfolio', 'project']