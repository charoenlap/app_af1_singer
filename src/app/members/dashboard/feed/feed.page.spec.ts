import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { feedPage } from './feed.page';

describe('feedPage', () => {
  let component: feedPage;
  let fixture: ComponentFixture<feedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [feedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(feedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
