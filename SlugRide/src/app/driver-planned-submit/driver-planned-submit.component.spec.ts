import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPlannedSubmitComponent } from './driver-planned-submit.component';

describe('DriverPlannedSubmitComponent', () => {
  let component: DriverPlannedSubmitComponent;
  let fixture: ComponentFixture<DriverPlannedSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPlannedSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverPlannedSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
