import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShadBalaPage } from './shad-bala.page';

describe('ShadBalaPage', () => {
  let component: ShadBalaPage;
  let fixture: ComponentFixture<ShadBalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadBalaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShadBalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
