from rest_framework import serializers
from user_app.models import Goal, Milestone

class MilestoneSerializer(serializers.HyperlinkedModelSerializer):
    goal_parent = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Milestone
        fields = ('goal_parent', 'text', 'deadline')


class GoalSerializer(serializers.HyperlinkedModelSerializer):
    goal = serializers.HyperlinkedRelatedField(read_only=True, view_name='ambitious:goal-detail')
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    milestones = MilestoneSerializer(many=True, read_only=True)

    class Meta:
        model = Goal
        fields = ('owner','goal', 'title', 'text', 'slug', 'milestones')
        read_only_fields = ('slug',)
