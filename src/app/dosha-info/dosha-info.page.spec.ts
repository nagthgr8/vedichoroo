import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoshaInfoPage } from './dosha-info.page';

describe('DoshaInfoPage', () => {
  let component: DoshaInfoPage;
  let fixture: ComponentFixture<DoshaInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoshaInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoshaInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
