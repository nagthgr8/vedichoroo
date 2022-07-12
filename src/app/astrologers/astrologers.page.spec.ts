import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AstrologersPage } from './astrologers.page';

describe('AstrologersPage', () => {
  let component: AstrologersPage;
  let fixture: ComponentFixture<AstrologersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrologersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AstrologersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
