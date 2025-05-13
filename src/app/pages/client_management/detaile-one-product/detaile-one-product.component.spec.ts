import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaileOneProductComponent } from './detaile-one-product.component';

describe('DetaileOneProductComponent', () => {
  let component: DetaileOneProductComponent;
  let fixture: ComponentFixture<DetaileOneProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaileOneProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaileOneProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
