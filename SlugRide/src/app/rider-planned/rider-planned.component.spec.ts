import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderPlannedComponent } from './rider-planned.component';

describe('RiderPlannedComponent', () => {
  let component: RiderPlannedComponent;
  let fixture: ComponentFixture<RiderPlannedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderPlannedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderPlannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
