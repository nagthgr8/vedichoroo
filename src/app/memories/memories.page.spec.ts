import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoriesPage } from './memories.page';

describe('MemoriesPage', () => {
  let component: MemoriesPage;
  let fixture: ComponentFixture<MemoriesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MemoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
