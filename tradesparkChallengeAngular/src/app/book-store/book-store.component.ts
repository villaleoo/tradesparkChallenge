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
  filterQuery: string = '';
  books$: Observable<Book[]>;
  

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit(): void {
    this.books$ = this.bookStoreService.getLeakedBooks();
    
  }

  
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

  onFilterChange(query: string) {
    this.bookStoreService.filterBooks(query);  
  }


}
