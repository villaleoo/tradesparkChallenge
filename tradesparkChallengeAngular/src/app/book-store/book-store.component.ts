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

  categoriesToString(categories: any[]): string {
    let categoriesString = "";
    categories.forEach((category, index) => {
      categoriesString += category.name;
      if (index < categories.length - 1) {
        categoriesString += ", ";
      }
    });
    return categoriesString;
  }

  onFilterChange(query: string) {
    this.bookStoreService.filterBooks(query);  
  }


}
