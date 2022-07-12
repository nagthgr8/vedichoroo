import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RajayogaPage } from './rajayoga.page';

describe('RajayogaPage', () => {
  let component: RajayogaPage;
  let fixture: ComponentFixture<RajayogaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RajayogaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RajayogaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
