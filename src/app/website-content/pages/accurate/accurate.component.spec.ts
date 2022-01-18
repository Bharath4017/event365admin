import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccurateComponent } from './accurate.component';

describe('AccurateComponent', () => {
  let component: AccurateComponent;
  let fixture: ComponentFixture<AccurateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccurateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccurateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
