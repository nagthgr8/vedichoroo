import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtrReportPage } from './btr-report.page';

describe('BtrReportPage', () => {
  let component: BtrReportPage;
  let fixture: ComponentFixture<BtrReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtrReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtrReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
