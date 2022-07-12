import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AstakvargaPage } from './astakvarga.page';

describe('AstakvargaPage', () => {
  let component: AstakvargaPage;
  let fixture: ComponentFixture<AstakvargaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstakvargaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AstakvargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
