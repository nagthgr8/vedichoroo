import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareerhoroPage } from './careerhoro.page';

describe('CareerhoroPage', () => {
  let component: CareerhoroPage;
  let fixture: ComponentFixture<CareerhoroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerhoroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareerhoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
