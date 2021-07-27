import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtrDetailRelPage } from './btr-detail-rel.page';

describe('BtrDetailRelPage', () => {
  let component: BtrDetailRelPage;
  let fixture: ComponentFixture<BtrDetailRelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtrDetailRelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtrDetailRelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
