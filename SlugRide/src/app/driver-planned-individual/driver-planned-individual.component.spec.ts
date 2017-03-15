import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPlannedIndividualComponent } from './driver-planned-individual.component';

describe('DriverPlannedIndividualComponent', () => {
  let component: DriverPlannedIndividualComponent;
  let fixture: ComponentFixture<DriverPlannedIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPlannedIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverPlannedIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
