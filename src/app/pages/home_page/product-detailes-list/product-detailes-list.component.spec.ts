import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailesListComponent } from './product-detailes-list.component';

describe('ProductDetailesListComponent', () => {
  let component: ProductDetailesListComponent;
  let fixture: ComponentFixture<ProductDetailesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
