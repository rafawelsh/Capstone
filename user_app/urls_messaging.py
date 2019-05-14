from django.urls import path
from user_app import views

app_name = 'messaging' #NAME SPACING

urlpatterns = [
    path('messaging/', views.messaging_home, name='messaging_home')
]
