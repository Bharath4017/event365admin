import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidEventRulesComponent } from './paid-event-rules.component';

describe('PaidEventRulesComponent', () => {
  let component: PaidEventRulesComponent;
  let fixture: ComponentFixture<PaidEventRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidEventRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidEventRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
