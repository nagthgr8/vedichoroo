import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoroscopePage } from './horoscope.page';

describe('HoroscopePage', () => {
  let component: HoroscopePage;
  let fixture: ComponentFixture<HoroscopePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoroscopePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoroscopePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
