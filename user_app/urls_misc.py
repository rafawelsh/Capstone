from django.urls import include, path
from rest_framework import routers
from . import views

app_name = 'user_app' #NAME SPACING

router = routers.DefaultRouter()
router.register(r'goals', views.GoalViewSet, 'goals')
router.register(r'milestones', views.MilestoneViewSet, 'milestones')

urlpatterns = [
    path('', views.home, name='home'),
    path('about', views.about, name='about'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))

]
