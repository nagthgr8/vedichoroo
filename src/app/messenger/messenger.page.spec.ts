import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessengerPage } from './messenger.page';

describe('MessengerPage', () => {
  let component: MessengerPage;
  let fixture: ComponentFixture<MessengerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessengerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
