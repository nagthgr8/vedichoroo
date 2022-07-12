import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsPage } from './tickets.page';

describe('TicketsPage', () => {
  let component: TicketsPage;
  let fixture: ComponentFixture<TicketsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
