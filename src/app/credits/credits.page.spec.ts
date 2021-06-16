import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditsPage } from './credits.page';

describe('CreditsPage', () => {
  let component: CreditsPage;
  let fixture: ComponentFixture<CreditsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
