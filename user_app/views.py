from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect
from .models import Goal, Milestone
from django.urls import reverse
from django.contrib import messages
from .forms import UserRegisterForm
from rest_framework import viewsets
from .serializers import GoalSerializer, MilestoneSerializer
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
# import json

# Views for Django Rest Framework
class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer

    def get_queryset(self):
        return Goal.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        goal = serializer.save(owner=self.request.user)
        milestones = self.request.data.get('milestones')
        for milestone in milestones:
            ms = Milestone(goal_parent=goal, text=milestone['text'], deadline=milestone['deadline'])
            ms.save()
        return goal


class MilestoneViewSet(viewsets.ModelViewSet):
    serializer_class = MilestoneSerializer

    def get_queryset(self):
        return Milestone.objects.filter(goal_parent__owner=self.request.user)

    def perform_create(self, serializer):
        parent_id = self.request.data.get('goal_parent')
        parent = get_object_or_404(Goal, pk=parent_id, owner=self.request.user)
        return serializer.save(goal_parent=parent)


#Views for Misc folder#
def home(request):
    return render(request, 'misc/home.html')


def about(request):
    return render(request, 'misc/about.html')


#Views for ambitious folder#
@login_required
def goals_home(request):
    #filter by user to have user only goals.
    goals = Goal.objects.filter(owner=request.user)
    milestones = Milestone.objects.all()
    # goal = Goal(text='testing with subtasks')
    # subtasks = ['1', '2', '3']
    # task_json = json.dumps(subtasks)
    # print(type(task_json), task_json)
    # goal.subtasks = task_json
    # goal.save()
    return render(request, "ambitious/goals_homepage.html", {'goals': goals, 'milestones':milestones})
    # return render(request, "ambitious/goals_homepage.html")

@login_required
def goals_single_view(request, goals_slug):
    goal = Goal.objects.get(slug=goals_slug)
    milestones = Milestone.objects.all()
    return render(request, "ambitious/goals_single_view.html", {'goal': goal, 'milestones':milestones})

@login_required
def create_goal(request):
    if request.method == 'POST':
        goal = Goal()
        goal.title = request.POST.get('goal_title')
        goal.text = request.POST.get('goal_text')
        goal.owner = request.user
        # goal = Goal(owner=request.user, title='goal_title', text='goal_text')
        goal.save()

        milestones = 0
        for i in request.POST:
            if i.startswith('milestone_name_'):
                milestones += 1

        for i in range(milestones):
            milestone = Milestone()
            milestone.goal_parent = goal
            milestone.text = request.POST.get('milestone_name'.format(i))
            milestone.deadline = request.POST.get('milestone_bday'.format(i))
            milestone.save()

        # return HttpResponseRedirect(reverse('ambitious:goals_view', kwargs={'goals_slug':goal.slug}))
        return redirect('ambitious:goals_view', goals_slug=goal.slug)

    return render(request, 'ambitious/create_goal.html')

def messaging_home(request):
    pass
