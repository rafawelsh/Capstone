from django.urls import path
from . import views

app_name = 'ambitious' #NAME SPACING

urlpatterns = [
    path('', views.goals_home, name='goals'),
    path('create', views.create_goal, name='create_goal'),
    path('<slug:goals_slug>', views.goals_single_view, name="goals_view"),
]
