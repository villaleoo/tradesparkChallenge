from rest_framework import serializers
from .models import Author, Category, Book
from .mixins import CapitalizeFieldsMixin


class AuthorSerializer(CapitalizeFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class CategorySerializer(CapitalizeFieldsMixin,serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

        
class BookSerializer(CapitalizeFieldsMixin, serializers.ModelSerializer):
    author = AuthorSerializer()
    categories = CategorySerializer(many=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'categories']


    def create(self, validated_data):
        author_data = validated_data.pop('author')
        categories_data = validated_data.pop('categories')
        if not Author.objects.filter(**author_data).exists():
            Author.objects.create(**author_data)
        author = Author.objects.get(**author_data)
        book = Book.objects.create(author=author, **validated_data)
        for category_data in categories_data:
            if not Category.objects.filter(**category_data).exists():
                Category.objects.create(**category_data)
            category = Category.objects.get(**category_data)
            book.categories.add(category)
        return book