import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
 

    beforeEach(() => {
        component= new SearchBarComponent();
    });

  it('should initialize searchQuery as an empty string', () => {
    component.ngOnInit();
    expect(component.searchQuery).toBe('');
  });

  it('should emit the searchQuery value when onSearchChange is called', () => {
     const emitSpy = jest.spyOn(component.searchChange, 'emit');

     const newSearchQuery = 'search for user';
     component.searchQuery = newSearchQuery;
 
     component.onSearchChange();
 
     //verifica que emit haya sido llamado con el valor correcto
     expect(emitSpy).toHaveBeenCalledWith(newSearchQuery);
  });

});
