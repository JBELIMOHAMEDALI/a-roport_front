import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAvisForAdminComponent } from './list-avis-for-admin.component';

describe('ListAvisForAdminComponent', () => {
  let component: ListAvisForAdminComponent;
  let fixture: ComponentFixture<ListAvisForAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAvisForAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAvisForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
