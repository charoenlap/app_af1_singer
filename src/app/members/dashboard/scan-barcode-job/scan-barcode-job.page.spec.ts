import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanBarcodeJobPage } from './scan-barcode-job.page';

describe('ScanBarcodeJobPage', () => {
  let component: ScanBarcodeJobPage;
  let fixture: ComponentFixture<ScanBarcodeJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanBarcodeJobPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanBarcodeJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
