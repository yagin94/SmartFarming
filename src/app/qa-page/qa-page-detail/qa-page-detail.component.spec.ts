import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaPageDetailComponent } from './qa-page-detail.component';

describe('QaPageDetailComponent', () => {
  let component: QaPageDetailComponent;
  let fixture: ComponentFixture<QaPageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaPageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaPageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
