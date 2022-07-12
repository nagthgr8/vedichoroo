import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HouseInfoPage } from './house-info.page';

describe('HouseInfoPage', () => {
  let component: HouseInfoPage;
  let fixture: ComponentFixture<HouseInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
