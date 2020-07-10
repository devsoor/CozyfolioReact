from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsOwnerOrReadOnly
from .models import User, Portfolio, Project, Member, Skill, SocialMedia, Job
from .serializers import UserSerializer, PortfolioSerializer, ProjectSerializer, MemberSerializer
from django.contrib.auth import get_user_model
from django.core.files.storage import FileSystemStorage
from django.contrib import messages
from django.http import HttpResponse
import bcrypt
from datetime import date, datetime, timezone, timedelta
import pytz
import pprint
from django.db.models import Q
import json
import ast
import urllib.parse
import os
from datetime import datetime

def index(request):
    return render(request, "index.html")

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#
# Portfolio functions==========================================================================================
#
# Used for GET and POST methods
class PortfolioList(generics.ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        if serializer.is_valid():
            print ("PortfolioList: perform_create, serializer.data = ", serializer.validated_data)
            print ("self.request: ", self.request)
            print ("self.request.user: ", self.request.user)
            # save the user for this portfolio
            serializer.save(user=self.request.user)

        # save the project list for this portfolio


# Used for GET, PUT, and DELETE methods
class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# Used for GET and POST methods
class ProjectList(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        print ("ProjectList: perform_create, serializer.data = ", serializer.validated_data)
        print ("self.request: ", self.request)
        data = self.request.data
        for item in data.items():
            print ("self.request.data: item = ", item)
        name = data['name']
        summary = data['summary']
        techUsed = data['techUsed']
        process = data['process']
        pictures_data = data['pictures']
        for pic in pictures_data:
            print ("pictures_data: pic = ", pic)
        url = data['url']
        members_data = data['members']
        user=self.request.user
        print ("self.request.user: ", user)
        project = Project.objects.create(name=name, summary=summary, techUsed=techUsed, process=process, url=url, user=user)
        for member in members_data:
            Member.objects.create(project=project, name=member)
        return project

# Used for GET, PUT, and DELETE methods
class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
