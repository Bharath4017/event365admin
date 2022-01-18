import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuerComponent } from './venuer.component';

describe('VenuerComponent', () => {
  let component: VenuerComponent;
  let fixture: ComponentFixture<VenuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
