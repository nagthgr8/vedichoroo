import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrashnaJyotishPage } from './prashna-jyotish.page';

describe('PrashnaJyotishPage', () => {
  let component: PrashnaJyotishPage;
  let fixture: ComponentFixture<PrashnaJyotishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrashnaJyotishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrashnaJyotishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
