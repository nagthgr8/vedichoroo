import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PujalistPage } from './pujalist.page';

describe('PujalistPage', () => {
  let component: PujalistPage;
  let fixture: ComponentFixture<PujalistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PujalistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PujalistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
