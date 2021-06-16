import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LifEventPage } from './lif-event.page';

describe('LifEventPage', () => {
  let component: LifEventPage;
  let fixture: ComponentFixture<LifEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LifEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
