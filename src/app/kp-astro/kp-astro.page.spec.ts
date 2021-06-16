import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KpAstroPage } from './kp-astro.page';

describe('KpAstroPage', () => {
  let component: KpAstroPage;
  let fixture: ComponentFixture<KpAstroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpAstroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KpAstroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
