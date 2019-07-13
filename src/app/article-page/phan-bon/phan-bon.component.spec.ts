import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanBonComponent } from './phan-bon.component';

describe('PhanBonComponent', () => {
  let component: PhanBonComponent;
  let fixture: ComponentFixture<PhanBonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanBonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanBonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
