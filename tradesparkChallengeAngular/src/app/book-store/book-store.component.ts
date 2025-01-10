import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../book-store.service';
import { Book } from '../types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit{
  /**
   * Variable que almacena el valor del input ingresado por el usuario que actua como filtro
   * de busqueda.Input utilizado: {@link SearchBarComponent}
   */
  filterQuery: string = '';
  /**
   * Propiedad de tipo observable. Util para renderizar contenido
   * dinámico (lista de libros) {@link BookStoreService#leakedBooks}.
   */
  books$: Observable<Book[]>;
  

  constructor(private bookStoreService: BookStoreService) { }

  /**
   * Se suscribe a la lista de libros del servicio {@link BookStoreService} para
   * renderizarla en la tabla. La lista puede estar filtrada o puede
   * ser completa. 
   */
  ngOnInit(): void {
    this.books$ = this.bookStoreService.getLeakedBooks();
    
  }

  /**
   * @param bookData Contiene id y nombre de la categoria de un libro. Proviene de la etiqueta {@link LabelCategoryComponent#onClick} clickeada.
   * @returns Se comunica con el servicio de libros -> {@link BookStoreService} y le pasa la informacion que le da la etiqueta.
   */
  handleClickLabel(bookData: any){
 
    this.bookStoreService.updateCategories(bookData);
    
  }

  capitalizeTitle(value: string): string {
    if (!value) {
      return '';
    }

    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  capitalizeFirst(value: string): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  /**
   * El parametro lo recibe desde la barra de busqueda: {@link SearchBarComponent} .
   * @param query String ingresado por el usuario que se utiliza para filtrar el contenido de la tabla del template. 
   * @returns  Se comunica con el servicio de libros {@link BookStoreService} para enviarle la query que es utilizada para filtrar la tabla.
   */
  onFilterChange(query: string) {
    this.bookStoreService.filterBooks(query);  
  }


}
