import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuHoachVaBaoQuanComponent } from './thu-hoach-va-bao-quan.component';

describe('ThuHoachVaBaoQuanComponent', () => {
  let component: ThuHoachVaBaoQuanComponent;
  let fixture: ComponentFixture<ThuHoachVaBaoQuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuHoachVaBaoQuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuHoachVaBaoQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
