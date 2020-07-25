from django.db import models
from django.contrib.auth.models import User
import re
import bcrypt
from datetime import date, datetime, timedelta
from django.utils.timezone import now
import pprint
from django.conf import settings

class PdfFile(models.Model):
    title = models.CharField(max_length=100)
    pdf = models.FileField(upload_to='media/')

class Project(models.Model):
    name = models.CharField(max_length=200)
    summary = models.TextField(null=True)
    techUsed = models.TextField(null=True)
    process = models.TextField(null=True)
    url = models.CharField(max_length=255, null=True)
    giturl = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(User, related_name = "project", on_delete = models.CASCADE, null = True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

class Portfolio(models.Model):
    name = models.CharField(max_length=75)
    title = models.CharField(max_length=100, null=True)
    portfolioSummary = models.TextField(null=True)
    resume = models.FileField(upload_to='media/', null=True)
    projects = models.ManyToManyField(Project, related_name = "portfolios")
    user = models.ForeignKey(User, related_name = "portfolio", on_delete = models.CASCADE, null = True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return f"Portfolio object: {self.id} {self.name} {self.title}"

# Usage: for image in project.images: do something
class Picture(models.Model):
    picfile = models.ImageField(upload_to='media', null=True)
    project = models.ForeignKey(Project, related_name="pictures", on_delete = models.CASCADE, null = True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

class Video(models.Model):
    name = models.CharField(max_length=500)
    videofile= models.FileField(upload_to='videos/', null=True, verbose_name="")
    project = models.OneToOneField(Project, on_delete = models.CASCADE, null = True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

class Member(models.Model):
    name = models.CharField(max_length=200)
    project = models.ForeignKey(Project, related_name="members", on_delete = models.CASCADE, null = True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

class Skill(models.Model):
    languages = models.TextField(null=True) #using json to 'cast' list into a string
    frameworks = models.TextField(null=True) #using json to 'cast' list into a string
    databases = models.TextField(null=True) #using json to 'cast' list into a string
    clouds = models.TextField(null=True) #using json to 'cast' list into a string
    other = models.TextField(null=True) #using json to 'cast' list into a string
    # clouds was added
    user = models.OneToOneField(User, on_delete = models.CASCADE, null = True)
    portfolio = models.OneToOneField(Portfolio, on_delete = models.CASCADE, null = True)
    project = models.OneToOneField(Project, on_delete = models.CASCADE, null = True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

class SocialMedia(models.Model):
    name = models.CharField(max_length = 100, null=True)
    url = models.CharField(max_length = 255, null=True)
    logo = models.ImageField(upload_to='media/', null=True)
    user = models.ForeignKey(User, related_name = "socialMedia", on_delete = models.CASCADE, null = True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

class JobManager(models.Manager):
    def job_validator(self, postData):
        if not postData:
            return
        errors = {}
        if len(postData['JobFormtitle']) < 2:
            errors["JobFormtitle"] = "Title should be at least 2 characters"
        if len(postData['JobFormCompanyName']) < 2:
            errors["JobFormCompanyName"] = "Company name should be at least 2 characters"
        if len(postData['JobFormforapplyDate']) == 8:
            errors["JobFormforapplyDate"] = "You need to type the date. Date should be 8 characters"
        if len(postData['JobFormforrespondDate']) == 8:
            errors["JobFormforrespondDate"] = "You need to type the date.Date should be 8 characters"
        if len(postData['JobFormforestSalary']) < 3:
            errors["JobFormforestSalary"] = "You need to insert the estimate salary per month"
        return errors
    

class Job(models.Model):
    jobTitle = models.CharField(max_length=75)
    company = models.CharField(max_length=75)
    applyDate = models.DateField()
    respondDate = models.DateField()
    response = models.IntegerField()
    estSalary = models.IntegerField()
    portfolio = models.ForeignKey(Portfolio, related_name="jobs", on_delete = models.CASCADE)
    user = models.ForeignKey(User, related_name="jobs", on_delete = models.CASCADE)
    numbofJobApplied = models.IntegerField(null=True)
    averageRespond = models.IntegerField(null=True)
    offerReceived = models.IntegerField(null=True)
    offerReject = models.IntegerField(null=True)
    mostPopularPortfolio = models.CharField(max_length=75, null=True)
    numbofCompanyApplied = models.IntegerField(null=True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    objects = JobManager()
