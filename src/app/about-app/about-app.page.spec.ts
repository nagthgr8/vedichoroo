import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutAppPage } from './about-app.page';

describe('AboutAppPage', () => {
  let component: AboutAppPage;
  let fixture: ComponentFixture<AboutAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
