import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedMapsComponent } from './planned-maps.component';

describe('PlannedMapsComponent', () => {
  let component: PlannedMapsComponent;
  let fixture: ComponentFixture<PlannedMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
