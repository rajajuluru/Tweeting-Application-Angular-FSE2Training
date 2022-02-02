import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAirLineComponent } from './edit-air-line.component';

describe('EditAirLineComponent', () => {
  let component: EditAirLineComponent;
  let fixture: ComponentFixture<EditAirLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAirLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAirLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
