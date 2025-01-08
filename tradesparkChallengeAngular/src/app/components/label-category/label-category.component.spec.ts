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
});
