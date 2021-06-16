import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanchangPage } from './panchang.page';

describe('PanchangPage', () => {
  let component: PanchangPage;
  let fixture: ComponentFixture<PanchangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanchangPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanchangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
