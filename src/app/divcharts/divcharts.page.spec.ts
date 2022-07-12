import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DivchartsPage } from './divcharts.page';

describe('DivchartsPage', () => {
  let component: DivchartsPage;
  let fixture: ComponentFixture<DivchartsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivchartsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DivchartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
