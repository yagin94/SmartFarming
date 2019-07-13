import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangChinhComponent } from './trang-chinh.component';

describe('TrangChinhComponent', () => {
  let component: TrangChinhComponent;
  let fixture: ComponentFixture<TrangChinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangChinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangChinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
