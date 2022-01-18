import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedEventComponent } from './archived-event.component';

describe('ArchivedEventComponent', () => {
  let component: ArchivedEventComponent;
  let fixture: ComponentFixture<ArchivedEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
