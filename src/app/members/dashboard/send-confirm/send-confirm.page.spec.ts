import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendConfirmPage } from './send-confirm.page';

describe('SendConfirmPage', () => {
  let component: SendConfirmPage;
  let fixture: ComponentFixture<SendConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
