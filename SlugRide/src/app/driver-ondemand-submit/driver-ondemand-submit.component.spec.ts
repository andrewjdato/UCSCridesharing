import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOndemandSubmitComponent } from './driver-ondemand-submit.component';

describe('DriverOndemandSubmitComponent', () => {
  let component: DriverOndemandSubmitComponent;
  let fixture: ComponentFixture<DriverOndemandSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverOndemandSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverOndemandSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
