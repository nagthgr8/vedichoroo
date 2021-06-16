import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarConstPage } from './star-const.page';

describe('StarConstPage', () => {
  let component: StarConstPage;
  let fixture: ComponentFixture<StarConstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarConstPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarConstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
