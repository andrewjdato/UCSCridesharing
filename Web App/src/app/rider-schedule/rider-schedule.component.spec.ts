import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderScheduleComponent } from './rider-schedule.component';

describe('RiderScheduleComponent', () => {
  let component: RiderScheduleComponent;
  let fixture: ComponentFixture<RiderScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
