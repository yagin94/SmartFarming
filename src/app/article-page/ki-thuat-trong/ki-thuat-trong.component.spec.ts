import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiThuatTrongComponent } from './ki-thuat-trong.component';

describe('KiThuatTrongComponent', () => {
  let component: KiThuatTrongComponent;
  let fixture: ComponentFixture<KiThuatTrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiThuatTrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiThuatTrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
