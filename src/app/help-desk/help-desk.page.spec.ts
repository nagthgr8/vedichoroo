import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpDeskPage } from './help-desk.page';

describe('HelpDeskPage', () => {
  let component: HelpDeskPage;
  let fixture: ComponentFixture<HelpDeskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDeskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpDeskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
