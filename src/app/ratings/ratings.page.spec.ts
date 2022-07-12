import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatingsPage } from './ratings.page';

describe('RatingsPage', () => {
  let component: RatingsPage;
  let fixture: ComponentFixture<RatingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
