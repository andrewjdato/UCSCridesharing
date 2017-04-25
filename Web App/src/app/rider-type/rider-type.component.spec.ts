import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderTypeComponent } from './rider-type.component';

describe('RiderTypeComponent', () => {
  let component: RiderTypeComponent;
  let fixture: ComponentFixture<RiderTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
