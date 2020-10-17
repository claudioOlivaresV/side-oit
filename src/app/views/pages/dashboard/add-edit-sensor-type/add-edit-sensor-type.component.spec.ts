import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSensorTypeComponent } from './add-edit-sensor-type.component';

describe('AddEditSensorTypeComponent', () => {
  let component: AddEditSensorTypeComponent;
  let fixture: ComponentFixture<AddEditSensorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSensorTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSensorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
