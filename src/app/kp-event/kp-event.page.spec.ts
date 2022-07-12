import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KpEventPage } from './kp-event.page';

describe('KpEventPage', () => {
  let component: KpEventPage;
  let fixture: ComponentFixture<KpEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KpEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
