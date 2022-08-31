
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get-data/',views.StackOverflowSearch.as_view() ),
]
