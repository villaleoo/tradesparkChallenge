from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Book, Category, Author


class BookCategoriesTest(APITestCase):

    def setUp(self):
        self.category = Category.objects.create(name="Testing")
        self.author = Author.objects.create(name="Anonymous")
        self.book = Book.objects.create(title="essential tests", author=self.author)
        self.book.categories.add(self.category)

        self.url = reverse('categories', kwargs={'pk': self.book.pk}) 
    
    def test_add_category_to_book(self):
        new_category = Category.objects.create(name='The test category')
        
        response = self.client.patch(self.url, {'category_name': 'The test category'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.book.refresh_from_db()
        self.assertIn(new_category, self.book.categories.all())  

    def test_remove_category_to_book(self):
        response = self.client.patch(self.url,{'category_name': "Testing"},format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.book.refresh_from_db()
        self.assertNotIn(self.category,self.book.categories.all())

    def test_book_not_found(self):
        url_not_found=reverse('categories',kwargs={'pk':2873})

        response= self.client.patch(url_not_found,{'category_name': 'The test category'},format='json')

        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['message'], 'Book not found.')


    def test_category_not_found(self):
        response = self.client.patch(self.url, {'category_name': 'Fake category'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['message'], "No category found for 'fake category'.")
    
   