import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookStoreService } from '../book-store.service';
import { Book } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit, OnDestroy{
  filterQuery: string = '';
  books: Book[] = [];
  private bookSubscription: Subscription;


  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit(): void {
    this.bookSubscription = this.bookStoreService.getLeakedBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
    
  }

  ngOnDestroy(): void {
    if(this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }


  handleClickLabel(dataLabel: any){
    const book = this.books.find(b => Number(b.id) === Number(dataLabel.id));

    if(book?.categories && book.categories.length > 0){
      const index = this.books.indexOf(book);
      const category = book.categories.find(c=> c.name.toLowerCase() === dataLabel.category.toLowerCase());

      if(category){
        const indexCat = book.categories.indexOf(category);
        this.books[index].categories?.splice(indexCat,1);
      }
      
    }
   
   
  }

  onFilterChange(query: string) {
    this.bookStoreService.filterBooks(query);  
  }


}
