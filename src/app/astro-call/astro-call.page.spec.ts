import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroCallComponent } from './astro-call.component';

describe('AstroCallComponent', () => {
  let component: AstroCallComponent;
  let fixture: ComponentFixture<AstroCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
