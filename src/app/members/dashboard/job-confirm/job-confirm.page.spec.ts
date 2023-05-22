import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobConfirmPage } from './job-confirm.page';

describe('JobConfirmPage', () => {
  let component: JobConfirmPage;
  let fixture: ComponentFixture<JobConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
