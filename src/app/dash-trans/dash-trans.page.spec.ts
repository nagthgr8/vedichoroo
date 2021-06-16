import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashTransPage } from './dash-trans.page';

describe('DashTransPage', () => {
  let component: DashTransPage;
  let fixture: ComponentFixture<DashTransPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTransPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashTransPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
