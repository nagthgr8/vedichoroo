import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublishBlogPage } from './publish-blog.page';

describe('PublishBlogPage', () => {
  let component: PublishBlogPage;
  let fixture: ComponentFixture<PublishBlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishBlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
