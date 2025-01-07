import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private client: HttpClient) { }

  getBooks() {
    return this.client.get('http://localhost:8000/bookStore/books/')
  }
}
