import { BookStoreComponent } from './book-store.component';
import { BookStoreService } from '../book-store.service';
import { of } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
/*

describe('BookStoreComponent', () => {
    let component: BookStoreComponent;
    let bookStoreService: BookStoreService;
    let httpClientMock: jest.Mocked<HttpClient>; 


    beforeEach(() => {
        httpClientMock = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn().mockReturnValue(of({})),
            delete: jest.fn(),
            patch: jest.fn().mockReturnValue(of({})), 
        } as unknown as jest.Mocked<HttpClient>;
        bookStoreService= new BookStoreService(httpClientMock);
        jest.spyOn(bookStoreService, 'getLeakedBooks').mockReturnValue(of([])); 
        jest.spyOn(bookStoreService, 'updateCategories');
        jest.spyOn(bookStoreService, 'filterBooks');
        jest.spyOn(bookStoreService, 'fetchBooks');

        component = new BookStoreComponent(bookStoreService);
      
    });


    it('should fetch books on init', () => {
        const mockBooks = [
          { id: 1, title: 'Book One', author: { id:1,name: 'Author One', bio: "", date_of_birth: null }, categories: [], publication_date: null, ISBN: null }
        ];
    
        //cuando se llama a getLeakedBooks retorna el mock
        jest.spyOn(bookStoreService, 'getLeakedBooks').mockReturnValue(of(mockBooks)); 
    
        component.ngOnInit();
    
        // verificacion que el observable books$ esté presente
        expect(component.books$).toBeTruthy();
    
        // suscripcion al observable para verificar que el valor retornado es el esperado
        component.books$.subscribe(books => {
            expect(books).toEqual(mockBooks);
        });
    });

    it('should call updateCategories on handleClickLabe with the correct parameter', () => {
        const bookData = { id: 1, category: 'New Category' };
    
        // llamar a handleClickLabel con los datos simulados
        component.handleClickLabel(bookData); 
    
        // verificar que updateCategories haya sido llamado con el parámetro bookData
        expect(bookStoreService.updateCategories).toHaveBeenCalledWith(bookData);
    });


    it('should call filterBooks on onFilterChange with the correct parameter', () => {
        const query = 'test';
        
        component.onFilterChange(query); 

        expect(bookStoreService.filterBooks).toHaveBeenCalledWith(query); 
    });
});*/
