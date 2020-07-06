from django.shortcuts import render, redirect
from .models import User, Portfolio, Project, Skill, SocialMedia, Job
from .serializers import PortfolioSerializer
from .forms import LanguagesForm, FrameworksForm, DatabasesForm, CloudsForm, PDFForm
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
from rest_framework import generics

def index(request):
    return render(request, "index.html")


#
# Portfolio functions==========================================================================================
#
# Used for GET and POST methods
class PortfolioList(generics.ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

# Used for GET, PUT, and DELETE methods
class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
