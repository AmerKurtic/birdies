from colorfield.fields import ColorField
from django.db import models


class Bird(models.Model):
    name = models.CharField(max_length=30, unique=True)
    color = ColorField()
    alignment = models.PositiveIntegerField(default=10)
    cohesion = models.PositiveIntegerField(default=10)
    separation = models.PositiveIntegerField(default=10)
    max_force = models.PositiveIntegerField(default=1)
    max_speed = models.PositiveIntegerField(default=1)
    min_amount = models.PositiveIntegerField(default=1)
    max_amount = models.PositiveIntegerField(default=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
