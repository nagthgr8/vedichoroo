import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtrInfoPage } from './btr-info.page';

describe('BtrInfoPage', () => {
  let component: BtrInfoPage;
  let fixture: ComponentFixture<BtrInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtrInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtrInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
