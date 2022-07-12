import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AstrologerPage } from './astrologer.page';

describe('AstrologerPage', () => {
  let component: AstrologerPage;
  let fixture: ComponentFixture<AstrologerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrologerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AstrologerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
