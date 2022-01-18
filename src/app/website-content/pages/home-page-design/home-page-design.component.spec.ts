import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageDesignComponent } from './home-page-design.component';

describe('HomePageDesignComponent', () => {
  let component: HomePageDesignComponent;
  let fixture: ComponentFixture<HomePageDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
