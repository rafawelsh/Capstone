from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import User

def user_image_uh(instance, filename):
    return "users/{}/profile_image/{}".format(instance.username, filename)


class Goal(models.Model):
    owner = models.ForeignKey(User, related_name='Goals', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=500)
    completed = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)
    completed_date = models.DateField(null=True, blank=True)
    #moved the FK to milestones class
    # milestones = models.ForeignKey('Milestone', on_delete=models.CASCADE, blank=True, null=True)
    slug = models.SlugField(unique=True)
    # subtasks = models.TextField(default=None)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            number = 0
            slug_title = slugify(self.title)
            checking = True
            while checking:
                results = Goal.objects.filter(slug=slug_title)
                if results.exists():
                    slug_title = slugify(self.title) + '_' + str(number + 1)
                    number += 1
                else:
                    checking = False
                self.slug = slug_title
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-pk']

class Milestone(models.Model):
    goal_parent = models.ForeignKey('Goal', on_delete=models.CASCADE, related_name='milestones')
    text = models.CharField(max_length=100)
    created_date = models.DateTimeField(default=timezone.now)
    completed_date = models.DateField(null=True, blank=True)
    deadline = models.DateField()

    def __str__(self):
        return self.text
