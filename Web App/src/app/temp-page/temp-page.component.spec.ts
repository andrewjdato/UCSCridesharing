import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempPageComponent } from './temp-page.component';

describe('TempPageComponent', () => {
  let component: TempPageComponent;
  let fixture: ComponentFixture<TempPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
