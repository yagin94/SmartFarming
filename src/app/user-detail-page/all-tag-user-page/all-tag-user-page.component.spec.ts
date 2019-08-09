import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTagUserPageComponent } from './all-tag-user-page.component';

describe('AllTagUserPageComponent', () => {
  let component: AllTagUserPageComponent;
  let fixture: ComponentFixture<AllTagUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTagUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTagUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
