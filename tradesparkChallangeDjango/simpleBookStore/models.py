from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    
    class Meta:
        app_label = 'simpleBookStore'

    def save(self, *args, **kwargs):
        if self.name:
            self.name = self.name.lower()
        if self.bio:
            self.bio = self.bio.lower()
            
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.name:
            self.name = self.name.lower()
        if self.description:
            self.description = self.description.lower()

        super().save(*args, **kwargs)


    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)
    publication_date = models.DateField(blank=True, null=True)
    ISBN = models.CharField(max_length=13, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.title:
            self.title = self.title.lower()
          
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

