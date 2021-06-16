import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NakInfoPage } from './nak-info.page';

describe('NakInfoPage', () => {
  let component: NakInfoPage;
  let fixture: ComponentFixture<NakInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NakInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NakInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
