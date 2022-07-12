import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MypubzRespPage } from './mypubz-resp.page';

describe('MypubzRespPage', () => {
  let component: MypubzRespPage;
  let fixture: ComponentFixture<MypubzRespPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypubzRespPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MypubzRespPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
