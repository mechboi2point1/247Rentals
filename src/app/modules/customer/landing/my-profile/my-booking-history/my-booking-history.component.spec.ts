import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingHistoryComponent } from './my-booking-history.component';

describe('MyBookingHistoryComponent', () => {
  let component: MyBookingHistoryComponent;
  let fixture: ComponentFixture<MyBookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
