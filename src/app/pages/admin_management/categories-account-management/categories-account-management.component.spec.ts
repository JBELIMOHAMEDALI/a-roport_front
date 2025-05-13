import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAccountManagementComponent } from './categories-account-management.component';

describe('CategoriesAccountManagementComponent', () => {
  let component: CategoriesAccountManagementComponent;
  let fixture: ComponentFixture<CategoriesAccountManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesAccountManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
