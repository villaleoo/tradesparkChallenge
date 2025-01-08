from django.http import Http404
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Author, Category, Book
from .serializers import AuthorSerializer, CategorySerializer, BookSerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']  

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']  

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']  
    
    @action(detail= True, methods=['patch','put'], url_path="categories")
    def alternate_category(self, request, pk=None):

        try:
            book = self.get_object()
    
            category_name = request.data.get("category_name").strip().lower()

            category = Category.objects.get(name=category_name)

        except Http404:
            return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)
        except Category.DoesNotExist:
            return Response({"message": f"No category found for '{category_name}'."}, status=status.HTTP_404_NOT_FOUND)
   
        
      
        if category not in book.categories.all():
            book.categories.add(category)
        else:
            book.categories.remove(category)

        update_book = BookSerializer(book)

        return Response(update_book.data, status=status.HTTP_200_OK)
    

