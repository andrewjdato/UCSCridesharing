import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderPlannedSubmitComponent } from './rider-planned-submit.component';

describe('RiderPlannedSubmitComponent', () => {
  let component: RiderPlannedSubmitComponent;
  let fixture: ComponentFixture<RiderPlannedSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderPlannedSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderPlannedSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
