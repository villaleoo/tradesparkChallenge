import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './types';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
    private BASE_URL= 'http://localhost:8000/bookStore/';
    private primaryBooks: Book[] = [];
    private leakedBooks: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]); //suscribirse a los libros filtrados cuando cambian al activarse el filtro

    constructor(private client: HttpClient) { }

    fetchBooks(){
      this.client.get<Book[]>(`${this.BASE_URL}books/`)       // funcion que obtiene los datos de la API
        .pipe(
          tap((books) =>{ 
            this.primaryBooks=books;
            this.leakedBooks.next(this.primaryBooks);
          })
        )
      .subscribe();
    }

    getLeakedBooks() {
      if(this.primaryBooks=[]){   //si no hay data la manda a pedir
        this.fetchBooks();
      }

      return this.leakedBooks;             
    }

    filterBooks(query: string) {
      if (query === '') {
          this.leakedBooks.next(this.primaryBooks);
      } else {

        const filterBooks = this.primaryBooks.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||           //si la query la contiene el titulo del libro
          book.author.name.toLowerCase().includes(query.toLowerCase()) ||             //si la query la contiene el nombre del autor del libro
          (book.categories && book.categories.some(cat => cat.name.toLowerCase().includes(query.toLowerCase())) )  //si la query la contiene el nombre de alguna de las categorias del libro
        );

        if(filterBooks.length > 0){
          this.leakedBooks.next(filterBooks);
        }else{
          this.leakedBooks.next(this.primaryBooks);
        }
      }
    }

 
}
