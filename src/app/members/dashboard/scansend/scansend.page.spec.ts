import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScansendPage } from './scansend.page';

describe('ScansendPage', () => {
  let component: ScansendPage;
  let fixture: ComponentFixture<ScansendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScansendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScansendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
