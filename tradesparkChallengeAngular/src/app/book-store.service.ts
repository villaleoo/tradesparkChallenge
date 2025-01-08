import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './types';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
    private BASE_URL= 'http://localhost:8000/bookStore/';
    private primaryData: Book[] = [];
    private dataSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

    constructor(private client: HttpClient) { }

    getBooks() {
      return this.client.get(`${this.BASE_URL}books/`)
    }
}
