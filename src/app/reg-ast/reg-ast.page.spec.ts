import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegAstPage } from './reg-ast.page';

describe('RegAstPage', () => {
  let component: RegAstPage;
  let fixture: ComponentFixture<RegAstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegAstPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegAstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
