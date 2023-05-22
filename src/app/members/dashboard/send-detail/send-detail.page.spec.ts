import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDetailPage } from './send-detail.page';

describe('SendDetailPage', () => {
  let component: SendDetailPage;
  let fixture: ComponentFixture<SendDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
