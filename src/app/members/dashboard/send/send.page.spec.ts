import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { sendPage } from './send.page';

describe('sendPage', () => {
  let component: sendPage;
  let fixture: ComponentFixture<sendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [sendPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(sendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
