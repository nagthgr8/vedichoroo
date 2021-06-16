import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyForecastPage } from './daily-forecast.page';

describe('DailyForecastPage', () => {
  let component: DailyForecastPage;
  let fixture: ComponentFixture<DailyForecastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyForecastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
