from django.urls import include, path
from rest_framework import routers
from . import views

app_name = 'user_app' #NAME SPACING

# router = routers.DefaultRouter()
# router.register(r'goals', views.GoalViewSet)
# router.register(r'milestone', views.MilestoneViewSet)

urlpatterns = [
    path('', views.home, name='home'),
    path('about', views.about, name='about'),

]
