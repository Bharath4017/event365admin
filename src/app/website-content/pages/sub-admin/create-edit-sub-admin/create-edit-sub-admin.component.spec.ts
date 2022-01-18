import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSubAdminComponent } from './create-edit-sub-admin.component';

describe('CreateEditSubAdminComponent', () => {
  let component: CreateEditSubAdminComponent;
  let fixture: ComponentFixture<CreateEditSubAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditSubAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSubAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
