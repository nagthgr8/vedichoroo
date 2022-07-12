import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransitPredictionsPage } from './transit-predictions.page';

describe('TransitPredictionsPage', () => {
  let component: TransitPredictionsPage;
  let fixture: ComponentFixture<TransitPredictionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitPredictionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransitPredictionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
