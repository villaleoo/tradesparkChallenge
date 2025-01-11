import { BookStoreService } from './book-store.service';
import { Book } from './types';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

/*

describe('BookStoreService', () => {
    let service: BookStoreService;
    let httpClientMock: jest.Mocked<HttpClient>;

    beforeEach(() => {
      httpClientMock = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        patch: jest.fn(), 
      } as unknown as jest.Mocked<HttpClient>;
  
      service = new BookStoreService(httpClientMock);
    });


    it('should fetch books and update leakedBooks', () => {
        const mockBooks: Book[] = [
          {
            id: 1,
            title: 'Book One',
            author: { id: 1, name: 'Author One', bio: '', date_of_birth: null },
            categories: [],
            publication_date: null,
            ISBN: null,
          },
          {
            id: 2,
            title: 'Book Two',
            author: { id: 1, name: 'Author One', bio: '', date_of_birth: null },
            categories: [],
            publication_date: null,
            ISBN: null,
          },
        ];
    
        httpClientMock.get.mockReturnValueOnce(of(mockBooks)); 
    
        service.fetchBooks();
    
        expect(httpClientMock.get).toHaveBeenCalledWith(`${service['BASE_URL']}books/`);
    
        service.getLeakedBooks().subscribe((books) => {
          expect(books).toEqual(mockBooks); 
        });
      });
      
    it('should find books that contain "one" and show all books if there are no filters', () => {
        const mockBooks: Book[] = [
          {
            id: 1,
            title: 'Book One',
            author: { id: 1, name: 'Author One', bio: '', date_of_birth: null },
            categories: [],
            publication_date: null,
            ISBN: null,
          },
          {
            id: 2,
            title: 'Book Two',
            author: { id: 1, name: 'Author One', bio: '', date_of_birth: null },
            categories: [],
            publication_date: null,
            ISBN: null,
          },
        ];
    
        service['primaryBooks'] = mockBooks;
    
        service.filterBooks('One');
    
        service.getLeakedBooks().subscribe((filtered) => {
          expect(filtered.length).toBe(1);
          expect(filtered[0].title).toBe('Book One');
        });
    
        service.filterBooks('');
    
        service.getLeakedBooks().subscribe((all) => {
          expect(all.length).toBe(2);
        });
      });

    it('should add a category to the book and update the list of filtered books', () => {
        const mockBook: Book = {
            id: 1,
            title: 'Book One',
            author: { id: 1, name: 'Author One', bio: '', date_of_birth: null },
            categories: [{ id: 1, name: 'New Category', description: 'fake desc' }],
            publication_date: null,
            ISBN: null,
          };
      
          // simulacion de la lista de libros en el servicio
          service['primaryBooks'] = [mockBook];
      
          const updatedData = { id: 1, category: 'Software' };
          const espectData= {category_name:"software"};
      
          // simulacion de la respuesta de api
          httpClientMock.patch.mockReturnValueOnce(of({ ...mockBook, categories:[]}));
                
          service.updateCategories(updatedData);
      
          // verificacion de que se envien parametros correctos a la consulta patch
          expect(httpClientMock.patch).toHaveBeenCalledWith(
            `${service['BASE_URL']}books/1/categories/`,
            espectData
          );
      
          // verificacion que el libro se haya actualizado en la lista filtrada
          service.getLeakedBooks().subscribe((books) => {
            expect(books[0].categories.length).toEqual(2); 
          });

    });

    afterEach(() => {
        jest.clearAllMocks();
    });
      
});
*/
