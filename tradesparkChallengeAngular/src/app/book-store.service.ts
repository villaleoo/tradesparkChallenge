import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './types';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


/**
 * Servicio que interactura con la API y permite operar sobre el recurso Book.
 */
@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
    private BASE_URL= 'http://localhost:8000/bookStore/';

    private queryFilter: string='';
    private booksFilters: Book[] = [];
    /**
     * Almacena localmente la totalidad de los libros obtenidos de la API.
     */
    private primaryBooks: Book[] = [];
    /**
     * Almacena la totalidad de los libros obtenidos ó la lista de libros filtrada.
     * Emite cambios a los componentes suscriptos.
    */
   private leakedBooks: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
   
   constructor(private client: HttpClient) { }

    /**
     * Emite un cambio en la lista de la variable Observable.
     * 
     * Obtiene la lista completa de libros de la API.
     * Almacena en las variables primaryBooks y leakedBooks la lista completa obtenida.
     */
    fetchBooks(){
      this.client.get<Book[]>(`${this.BASE_URL}books/`)       
        .pipe(
          tap((books) =>{ 
            this.primaryBooks=books;
            this.leakedBooks.next(this.primaryBooks);
          })
        )
      .subscribe({
        error: (err) => console.error('Error fetch API:', err),
      });
    }

    /**
     * Si no hay elementos iniciales, ejecuta fetchBooks() para traerlos de la API.
     * @returns Lista de libros filtrada. Es de tipo Observable para poder suscribirse a cambios en la lista.
     */
    getLeakedBooks() {
      if (this.primaryBooks.length === 0) {  
        this.fetchBooks();  
      }
    
      return this.leakedBooks.asObservable();         
    }

     /**
     * Emite un cambio en la lista de la variable Observable. Lista completa de libros ó Lista filtrada.
     * 
     * Itera la lista de libros para encontrar los que contienen en su titulo, autor o categorias el parametro string 'query'.
     * Si no hay libros que coinicidan con la busqueda, retorna la lista completa de libros.
     * @param query Contenido que ingresa el usuario en un input de texto.
     */

    filterBooks(query: string) {
      this.queryFilter=query;

      if (query === '') {
          this.leakedBooks.next(this.primaryBooks);

      } else {

        this.booksFilters = this.primaryBooks.filter(book => 
          this.queryInBook(book,query) 
        );

        if(this.booksFilters.length > 0){
          this.leakedBooks.next(this.booksFilters);
        }else{
          this.leakedBooks.next(this.primaryBooks);
        }

      }
    }

    /**
     * Emite un cambio en la lista de la variable Observable.
     * 
     * Recibe por parametro el id de un libro y el nombre de una categoria que posee el libro, para eliminar la relación en la API.
     * Modifica la lista local primaryBooks insertando el libro con sus categorias actualizadas.
     * Si el contenido que se muestra en pantalla esta siendo filtrado, emite la lista filtrada.
     * @param data Objeto que debe contener el id de un libro y el nombre de la categoria a eliminar -> {id:1,category:"example"}.
     */

    updateCategories(data: any) {
      const requestBody = { category_name: `${data.category.toLowerCase()}` };
    
      this.client.patch<Book>(`${this.BASE_URL}books/${data.id}/categories/`, requestBody)
        .pipe(
          tap((updatedBook) => {
            const index = this.primaryBooks.findIndex(book => book.id === updatedBook.id);
            const indexFilter = this.booksFilters.findIndex(book => book.id === updatedBook.id);

            if (index !== -1) {
                this.primaryBooks.splice(index,1,updatedBook);

                if(this.queryInBook(updatedBook,this.queryFilter) && indexFilter !== -1 && this.queryFilter !== ''){
                    this.booksFilters.splice(indexFilter,1,updatedBook);

                    this.leakedBooks.next(this.booksFilters);
                }else{
                    this.leakedBooks.next(this.primaryBooks);
                }
              
            }
          })
        )
        .subscribe({
          error: (err) => console.error('Error updating book:', err),
        });
    }

    queryInBook(book:Book, query:string ){
      return book.title.toLowerCase().includes(query.toLowerCase()) ||           
      book.author.name.toLowerCase().includes(query.toLowerCase()) ||             
      (book.categories && book.categories.some(cat => cat.name.toLowerCase().includes(query.toLowerCase()))) 
    }

 
}
