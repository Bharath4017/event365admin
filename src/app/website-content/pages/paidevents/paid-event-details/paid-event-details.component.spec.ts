import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidEventDetailsComponent } from './paid-event-details.component';

describe('PaidEventDetailsComponent', () => {
  let component: PaidEventDetailsComponent;
  let fixture: ComponentFixture<PaidEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
