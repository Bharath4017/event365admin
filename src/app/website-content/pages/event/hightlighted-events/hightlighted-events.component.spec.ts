import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HightlightedEventsComponent } from './hightlighted-events.component';

describe('HightlightedEventsComponent', () => {
  let component: HightlightedEventsComponent;
  let fixture: ComponentFixture<HightlightedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HightlightedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HightlightedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
