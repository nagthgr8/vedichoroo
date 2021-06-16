import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanetSigPage } from './planet-sig.page';

describe('PlanetSigPage', () => {
  let component: PlanetSigPage;
  let fixture: ComponentFixture<PlanetSigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetSigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetSigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
