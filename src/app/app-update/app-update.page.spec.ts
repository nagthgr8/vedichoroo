import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppUpdatePage } from './app-update.page';

describe('AppUpdatePage', () => {
  let component: AppUpdatePage;
  let fixture: ComponentFixture<AppUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
