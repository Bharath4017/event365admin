import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportQueriesComponent } from './support-queries.component';

describe('SupportQueriesComponent', () => {
  let component: SupportQueriesComponent;
  let fixture: ComponentFixture<SupportQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
