import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBillingsComponent } from './my-billings.component';

describe('MyBillingsComponent', () => {
  let component: MyBillingsComponent;
  let fixture: ComponentFixture<MyBillingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBillingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
