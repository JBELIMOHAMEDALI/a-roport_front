import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentValdationComponent } from './card-payment-valdation.component';

describe('CardPaymentValdationComponent', () => {
  let component: CardPaymentValdationComponent;
  let fixture: ComponentFixture<CardPaymentValdationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPaymentValdationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPaymentValdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
