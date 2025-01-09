import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchQuery as an empty string', () => {
    expect(component.searchQuery).toBe('');
  });

  it('should update searchQuery on input change', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    
    inputElement.value = 'New Title';
    inputElement.dispatchEvent(new Event('input')); 

    expect(component.searchQuery).toBe('New Title');
  });

  it('should call onSearchChange when input changes', () => {
    spyOn(component, 'onSearchChange'); 

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Other Title';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.onSearchChange).toHaveBeenCalled();
  });
});
