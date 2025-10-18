import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthDetailsFormComponent } from './birth-details-form.component';

describe('BirthDetailsFormComponent', () => {
  let component: BirthDetailsFormComponent;
  let fixture: ComponentFixture<BirthDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
