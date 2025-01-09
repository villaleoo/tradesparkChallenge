import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelCategoryComponent } from './label-category.component';

describe('LabelCategoryComponent', () => {
  let component: LabelCategoryComponent;
  let fixture: ComponentFixture<LabelCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text content', () => {
    component.textContent = 'New Category';
    fixture.detectChanges(); 

    const textLabel = fixture.nativeElement.querySelector('.text-label');
    expect(textLabel.textContent).toBe('New Category');
  });

  
  it('should call handleOnClick when button is clicked', () => {
    spyOn(component, 'handleOnClick'); 

    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click(); 

    expect(component.handleOnClick).toHaveBeenCalled();
  });

});
