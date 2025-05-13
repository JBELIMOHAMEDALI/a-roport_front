import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusOrsdresComponent } from './change-status-orsdres.component';

describe('ChangeStatusOrsdresComponent', () => {
  let component: ChangeStatusOrsdresComponent;
  let fixture: ComponentFixture<ChangeStatusOrsdresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStatusOrsdresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStatusOrsdresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
