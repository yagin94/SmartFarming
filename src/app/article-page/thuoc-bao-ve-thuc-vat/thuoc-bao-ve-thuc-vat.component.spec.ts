import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuocBaoVeThucVatComponent } from './thuoc-bao-ve-thuc-vat.component';

describe('ThuocBaoVeThucVatComponent', () => {
  let component: ThuocBaoVeThucVatComponent;
  let fixture: ComponentFixture<ThuocBaoVeThucVatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuocBaoVeThucVatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuocBaoVeThucVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
