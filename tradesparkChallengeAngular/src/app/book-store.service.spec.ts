import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookStoreService } from './book-store.service';
import { Book } from './types';

describe('BookStoreService', () => {
  let service: BookStoreService;
  let httpMock: HttpTestingController; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [BookStoreService]
    });

    service = TestBed.inject(BookStoreService); 
    httpMock = TestBed.inject(HttpTestingController); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books and update leakedBooks', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book One', author: { id:1,name: 'Author One',bio:"",date_of_birth:null}, categories: [], publication_date:null, ISBN:null },
      { id: 2, title: 'Book Two', author: { id:1,name: 'Author One',bio:"",date_of_birth:null}, categories: [], publication_date:null, ISBN:null }
    ];

    service.fetchBooks();

    const req = httpMock.expectOne(`${service['BASE_URL']}books/`);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockBooks); 

    service.getLeakedBooks().subscribe(books => {
      expect(books).toEqual(mockBooks); 
    });
  });

  it('should filter books correctly', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book One', author: { id:1,name: 'Author One',bio:"",date_of_birth:null}, categories: [], publication_date:null, ISBN:null },
      { id: 2, title: 'Book Two', author: { id:1,name: 'Author One',bio:"",date_of_birth:null}, categories: [], publication_date:null, ISBN:null }
    ];

    service['primaryBooks'] = mockBooks; 

    service.filterBooks('One');

    service.getLeakedBooks().subscribe(filtered => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Book One');
    });
    
    service.filterBooks('');
    
    service.getLeakedBooks().subscribe(all => {
      expect(all.length).toBe(2); 
    });
  });

  it('should update categories and update leaked books', () => {
    const mockBook =  { id: 1, title: 'Book One', author: { id:1,name: 'Author One',bio:"",date_of_birth:null}, categories: [{id:1,name:"New Category",description:"fake desc"}], publication_date:null, ISBN:null };
    
    service['primaryBooks'] = [mockBook]; 

    const updatedData = { id: 1, category: 'New Category' };
    
    service.updateCategories(updatedData);

    const req = httpMock.expectOne(`${service['BASE_URL']}books/1/categories/`);
    expect(req.request.method).toBe('PATCH');
    
    req.flush({ ...mockBook, categories: [] }); 

    service.getLeakedBooks().subscribe(books => {
      expect(books[0].categories).toEqual([]); 
    });
  });
});
