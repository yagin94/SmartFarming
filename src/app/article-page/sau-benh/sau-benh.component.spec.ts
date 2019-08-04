import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SauBenhComponent } from './sau-benh.component';

describe('SauBenhComponent', () => {
  let component: SauBenhComponent;
  let fixture: ComponentFixture<SauBenhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SauBenhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SauBenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
