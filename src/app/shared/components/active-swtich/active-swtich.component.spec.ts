import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSwtichComponent } from './active-swtich.component';

describe('ActiveSwtichComponent', () => {
  let component: ActiveSwtichComponent;
  let fixture: ComponentFixture<ActiveSwtichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSwtichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSwtichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
