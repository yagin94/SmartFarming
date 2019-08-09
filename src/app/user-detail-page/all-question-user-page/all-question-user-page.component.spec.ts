import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionUserPageComponent } from './all-question-user-page.component';

describe('AllQuestionUserPageComponent', () => {
  let component: AllQuestionUserPageComponent;
  let fixture: ComponentFixture<AllQuestionUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllQuestionUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuestionUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
