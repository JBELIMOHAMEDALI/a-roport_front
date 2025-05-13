import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailseAvisAdminComponent } from './detailse-avis-admin.component';

describe('DetailseAvisAdminComponent', () => {
  let component: DetailseAvisAdminComponent;
  let fixture: ComponentFixture<DetailseAvisAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailseAvisAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailseAvisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
