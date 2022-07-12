import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoneyhoroPage } from './moneyhoro.page';

describe('MoneyhoroPage', () => {
  let component: MoneyhoroPage;
  let fixture: ComponentFixture<MoneyhoroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyhoroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyhoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
