import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteContentLayoutComponent } from './website-content-layout.component';

describe('WebsiteContentLayoutComponent', () => {
  let component: WebsiteContentLayoutComponent;
  let fixture: ComponentFixture<WebsiteContentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteContentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
