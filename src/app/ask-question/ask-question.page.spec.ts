import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AskQuestionPage } from './ask-question.page';

describe('AskQuestionPage', () => {
  let component: AskQuestionPage;
  let fixture: ComponentFixture<AskQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AskQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
