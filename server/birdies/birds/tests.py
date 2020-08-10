from django.test import TestCase
from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse


class BirdTestCase(TestCase):
    def _create(self) -> Response:
        url = reverse('birds-list')
        response = self.client.post(url, self.data, content_type='application/json')
        return response

    def setUp(self) -> None:
        self.data = {
            'name': 'test',
            'color': '#000000',
            'alignment': 10,
            'cohesion': 10,
            'separation': 10,
            'max_force': 1,
            'max_speed': 1,
            'min_amount': 2,
            'max_amount': 3
        }
        self.create_response = self._create()
        self.detail_url = reverse('birds-detail', args=[self.create_response.data['id']])

    def test_create(self) -> None:
        self.assertEqual(self.create_response.status_code, status.HTTP_201_CREATED)

    def test_update(self) -> None:
        update_data = {
            'max_speed': 2
        }
        expected_data = self.data.copy()
        expected_data['max_speed'] = 2
        expected_data['id'] = self.create_response.data['id']
        response = self.client.patch(self.detail_url, update_data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, expected_data)

    def test_max_less_than_min_amount(self) -> None:
        update_data = {
            'max_amount': 1
        }
        response = self.client.patch(self.detail_url, update_data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
