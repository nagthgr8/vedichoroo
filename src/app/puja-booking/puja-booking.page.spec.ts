import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PujaBookingPage } from './puja-booking.page';

describe('PujaBookingPage', () => {
  let component: PujaBookingPage;
  let fixture: ComponentFixture<PujaBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PujaBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PujaBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
