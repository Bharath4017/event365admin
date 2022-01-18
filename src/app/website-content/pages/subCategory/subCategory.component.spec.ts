import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { subCategoryComponent } from './subCategory.component';

describe('subCategoryComponent', () => {
  let component: subCategoryComponent;
  let fixture: ComponentFixture<subCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ subCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(subCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
