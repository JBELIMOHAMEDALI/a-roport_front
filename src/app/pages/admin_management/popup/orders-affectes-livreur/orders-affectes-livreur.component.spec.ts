import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAffectesLivreurComponent } from './orders-affectes-livreur.component';

describe('OrdersAffectesLivreurComponent', () => {
  let component: OrdersAffectesLivreurComponent;
  let fixture: ComponentFixture<OrdersAffectesLivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersAffectesLivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAffectesLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
