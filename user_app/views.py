from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import Goal, Milestone
from django.urls import reverse
from django.contrib import messages
from .forms import UserRegisterForm
from rest_framework import viewsets
from .serializers import GoalSerializer, MilestoneSerializer
from django.contrib.auth import authenticate, login

# import json


# Views for Django Rest Framework
class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self):
        return todo

#Views for Misc folder#
def home(request):
    return render(request, 'misc/home.html')

def about(request):
    return render(request, 'misc/about.html')



#Views for ambitious folder#
def goals_home(request):
    goals = Goal.objects.all()
    milestones = Milestone.objects.all()
    # goal = Goal(text='testing with subtasks')
    # subtasks = ['1', '2', '3']
    # task_json = json.dumps(subtasks)
    # print(type(task_json), task_json)
    # goal.subtasks = task_json
    # goal.save()
    return render(request, "ambitious/goals_homepage.html", {'goals': goals, 'milestones':milestones})
    # return render(request, "ambitious/goals_homepage.html")

def goals_single_view(request, goals_slug):
    goal = Goal.objects.get(slug=goals_slug)
    milestones = Milestone.objects.all()
    return render(request, "ambitious/goals_single_view.html", {'goal': goal, 'milestones':milestones})

def create_goal(request):
    if request.method == 'POST':
        goal = Goal()

        goal.title = request.POST.get('goal_title')
        goal.text = request.POST.get('goal_text')
        goal.save()

        milestones = 0
        for i in request.POST:
            if i.startswith('milestone_name_'):
                milestones += 1

        for i in range(milestones):
            milestone = Milestone()
            milestone.text = request.POST.get('milestone_name_{}'.format(i))
            milestone.deadline = request.POST.get('milestone_bday_{}'.format(i))
            milestone.save()

        # return HttpResponseRedirect(reverse('ambitious:goals_view', kwargs={'goals_slug':goal.slug}))
        return redirect('ambitious:goals_view', goals_slug=goal.slug)

    return render(request, 'ambitious/create_goal.html')

def messaging_home(request):
    pass
