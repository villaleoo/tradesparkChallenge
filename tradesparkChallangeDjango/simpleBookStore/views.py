from django.http import Http404
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Author, Category, Book
from .serializers import AuthorSerializer, CategorySerializer, BookSerializer, RemoveCategorySerializer

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

  
    @action(detail= True, methods=['patch'], url_path="categories")
    @swagger_auto_schema(
        operation_summary="Elimina la categoría de un libro.",
        request_body=RemoveCategorySerializer,
        responses={
            200: openapi.Response('Successful Response', BookSerializer),
            404: openapi.Response('Book or category not found.')
        },
        operation_description="Elimina una categoría de un libro según id del libro y nombre de la categoría."
    )
    def remove_category(self, request, pk=None):
        book=None
        try:
            book = self.get_object()
    
            category_name = request.data.get("category_name").strip().lower()
            serializer = RemoveCategorySerializer(data=request.data)
            
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            category = Category.objects.get(name=category_name)
            

        except Http404:
            return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)
        except Category.DoesNotExist:
            return Response({"message": f"No category found for '{category_name}'."}, status=status.HTTP_404_NOT_FOUND)
        if category not in book.categories.all():
            return Response({"message": f"No category found for the book."}, status=status.HTTP_404_NOT_FOUND)
   
        
        book.categories.remove(category)

        update_book = BookSerializer(book)

        return Response(update_book.data, status=status.HTTP_200_OK)
    

