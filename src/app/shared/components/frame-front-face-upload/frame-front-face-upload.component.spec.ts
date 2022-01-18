import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameFrontFaceUploadComponent } from './frame-front-face-upload.component';

describe('FrameFrontFaceUploadComponent', () => {
  let component: FrameFrontFaceUploadComponent;
  let fixture: ComponentFixture<FrameFrontFaceUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameFrontFaceUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameFrontFaceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
