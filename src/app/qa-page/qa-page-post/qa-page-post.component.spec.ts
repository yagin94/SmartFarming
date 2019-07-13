import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaPagePostComponent } from './qa-page-post.component';

describe('QaPagePostComponent', () => {
  let component: QaPagePostComponent;
  let fixture: ComponentFixture<QaPagePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaPagePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaPagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
