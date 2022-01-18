import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaideventsComponent } from './paidevents.component';

describe('PaideventsComponent', () => {
  let component: PaideventsComponent;
  let fixture: ComponentFixture<PaideventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaideventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaideventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
