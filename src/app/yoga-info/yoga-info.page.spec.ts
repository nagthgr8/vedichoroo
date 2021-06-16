import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YogaInfoPage } from './yoga-info.page';

describe('YogaInfoPage', () => {
  let component: YogaInfoPage;
  let fixture: ComponentFixture<YogaInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YogaInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YogaInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
