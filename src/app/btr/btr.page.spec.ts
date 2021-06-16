import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtrPage } from './btr.page';

describe('BtrPage', () => {
  let component: BtrPage;
  let fixture: ComponentFixture<BtrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
