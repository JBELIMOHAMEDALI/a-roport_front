import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEarningsComponent } from './payment-earnings.component';

describe('PaymentEarningsComponent', () => {
  let component: PaymentEarningsComponent;
  let fixture: ComponentFixture<PaymentEarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentEarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
