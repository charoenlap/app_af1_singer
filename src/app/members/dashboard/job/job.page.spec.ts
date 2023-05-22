import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { jobPage } from './job.page';

describe('jobPage', () => {
  let component: jobPage;
  let fixture: ComponentFixture<jobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [jobPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(jobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
