import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderOndemandSubmitComponent } from './rider-ondemand-submit.component';

describe('RiderOndemandSubmitComponent', () => {
  let component: RiderOndemandSubmitComponent;
  let fixture: ComponentFixture<RiderOndemandSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderOndemandSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderOndemandSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
