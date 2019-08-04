import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyThuatNhanGiongComponent } from './ky-thuat-nhan-giong.component';

describe('KyThuatNhanGiongComponent', () => {
  let component: KyThuatNhanGiongComponent;
  let fixture: ComponentFixture<KyThuatNhanGiongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyThuatNhanGiongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyThuatNhanGiongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
