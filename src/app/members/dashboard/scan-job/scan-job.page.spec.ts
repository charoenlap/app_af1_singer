import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanJobPage } from './scan-job.page';

describe('ScanJobPage', () => {
  let component: ScanJobPage;
  let fixture: ComponentFixture<ScanJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanJobPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
