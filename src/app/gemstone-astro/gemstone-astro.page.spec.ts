import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GemstoneAstroPage } from './gemstone-astro.page';

describe('GemstoneAstroPage', () => {
  let component: GemstoneAstroPage;
  let fixture: ComponentFixture<GemstoneAstroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GemstoneAstroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GemstoneAstroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
