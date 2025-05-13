import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCaredProductComponent } from './add-to-cared-product.component';

describe('AddToCaredProductComponent', () => {
  let component: AddToCaredProductComponent;
  let fixture: ComponentFixture<AddToCaredProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCaredProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCaredProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
