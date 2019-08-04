import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiongCayComponent } from './giong-cay.component';

describe('GiongCayComponent', () => {
  let component: GiongCayComponent;
  let fixture: ComponentFixture<GiongCayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiongCayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiongCayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
