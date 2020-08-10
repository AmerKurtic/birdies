from rest_framework import serializers

from .models import Bird


class BirdSerializer(serializers.ModelSerializer):
    alignment = serializers.IntegerField(min_value=10, max_value=100)
    cohesion = serializers.IntegerField(min_value=10, max_value=100)
    separation = serializers.IntegerField(min_value=10, max_value=100)
    max_force = serializers.IntegerField(min_value=1, max_value=10)
    max_speed = serializers.IntegerField(min_value=1, max_value=10)
    min_amount = serializers.IntegerField(min_value=1, max_value=100)
    max_amount = serializers.IntegerField(min_value=2, max_value=100)

    def validate(self, data):
        if 'max_amount' in data:
            min_amount = data['min_amount'] if 'min_amount' in data else self.instance.min_amount
            if data['max_amount'] <= min_amount:
                raise serializers.ValidationError('Max value must be higher than min value')
        return data

    class Meta:
        model = Bird
        exclude = ('created_at', 'updated_at')
