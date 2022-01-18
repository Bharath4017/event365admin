import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrganiserComponent } from './payment-organiser.component';

describe('PaymentOrganiserComponent', () => {
  let component: PaymentOrganiserComponent;
  let fixture: ComponentFixture<PaymentOrganiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOrganiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
