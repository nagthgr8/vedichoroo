import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtrDetailsPage } from './btr-details.page';

describe('BtrDetailsPage', () => {
  let component: BtrDetailsPage;
  let fixture: ComponentFixture<BtrDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtrDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtrDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
