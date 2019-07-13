import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePostPageComponent } from './article-post-page.component';

describe('ArticlePostPageComponent', () => {
  let component: ArticlePostPageComponent;
  let fixture: ComponentFixture<ArticlePostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePostPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
