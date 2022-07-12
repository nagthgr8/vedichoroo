import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HinduCalPage } from './hindu-cal.page';

describe('HinduCalPage', () => {
  let component: HinduCalPage;
  let fixture: ComponentFixture<HinduCalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinduCalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HinduCalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
