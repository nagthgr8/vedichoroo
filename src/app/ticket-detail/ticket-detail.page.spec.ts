import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketDetailPage } from './ticket-detail.page';

describe('TicketDetailPage', () => {
  let component: TicketDetailPage;
  let fixture: ComponentFixture<TicketDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
