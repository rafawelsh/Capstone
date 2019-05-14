from rest_framework import serializers
from user_app.models import Goal, Milestone

class GoalSerializer(serializers.HyperlinkedModelSerializer):
    goal = serializers.HyperlinkedRelatedField(read_only=True, view_name='ambitious:goals_view')

    class Meta:
        model = Goal
        fields = ('title', 'text')


class MilestoneSerializer(serializers.HyperlinkedModelSerializer):
    milestone = GoalSerializer(many=True, read_only=True)

    class Meta:
        model = Milestone
        fields = ('text', 'deadline')
