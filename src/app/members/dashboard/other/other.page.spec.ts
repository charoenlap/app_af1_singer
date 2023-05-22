import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { otherPage } from './other.page';

describe('otherPage', () => {
  let component: otherPage;
  let fixture: ComponentFixture<otherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [otherPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(otherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
