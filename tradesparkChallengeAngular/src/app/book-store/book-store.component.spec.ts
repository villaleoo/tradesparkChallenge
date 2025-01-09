import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreComponent } from './book-store.component';
import { BookStoreService } from '../book-store.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs'; 

type Spied<T> = {
  [K in keyof T]: jasmine.Spy;
};

describe('BookStoreComponent', () => {
  let component: BookStoreComponent;
  let fixture: ComponentFixture<BookStoreComponent>;
  let bookStoreService: Spied<BookStoreService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookStoreService', ['getLeakedBooks', 'updateCategories', 'filterBooks', 'fetchBooks']);

    await TestBed.configureTestingModule({
      declarations: [ BookStoreComponent ],
      providers: [{ provide: BookStoreService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    bookStoreService = TestBed.inject(BookStoreService) as unknown as Spied<BookStoreService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on init', () => {
    const mockBooks = [
      { id: 1, title: 'Book One', author: { id:1,name: 'Author One',bio:"",date_of_birth:null}, categories: [], publication_date:null, ISBN:null }
    ];

    bookStoreService.getLeakedBooks.and.returnValue(of(mockBooks)); 

    component.ngOnInit(); 

    expect(component.books$).toBeTruthy(); 
    component.books$.subscribe(books => {
      expect(books).toEqual(mockBooks); 
    });
  });

  it('should call updateCategories on handleClickLabel', () => {
    const bookData = { id: 1, category: 'New Category' };
    
    component.handleClickLabel(bookData); 

    expect(bookStoreService.updateCategories).toHaveBeenCalledWith(bookData);
  });

  it('should capitalize title correctly', () => {
    expect(component.capitalizeTitle('test title')).toBe('Test Title');
    expect(component.capitalizeTitle('')).toBe('');
  });

  it('should capitalize first letter correctly', () => {
    expect(component.capitalizeFirst('test')).toBe('Test');
    expect(component.capitalizeFirst('')).toBe('');
  });

  it('should call filterBooks on onFilterChange', () => {
    const query = 'test';
    
    component.onFilterChange(query); 

    expect(bookStoreService.filterBooks).toHaveBeenCalledWith(query); 
  });
});
