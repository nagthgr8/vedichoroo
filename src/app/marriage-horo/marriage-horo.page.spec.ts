import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarriageHoroPage } from './marriage-horo.page';

describe('MarriageHoroPage', () => {
  let component: MarriageHoroPage;
  let fixture: ComponentFixture<MarriageHoroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageHoroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarriageHoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
