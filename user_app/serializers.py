from rest_framework import serializers
from user_app.models import Goal, Milestone

class GoalSerializer(serializers.HyperlinkedModelSerializer):
    goal = serializers.HyperlinkedRelatedField(read_only=True, view_name='ambitious:goal-detail')
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Goal
        fields = ('owner','goal', 'title', 'text')


class MilestoneSerializer(serializers.HyperlinkedModelSerializer):
    milestone = GoalSerializer(many=True, read_only=True)
    goal_parent = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Milestone
        fields = ('goal_parent', 'milestone', 'text', 'deadline')
