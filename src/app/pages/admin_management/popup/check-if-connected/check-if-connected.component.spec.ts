import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIfConnectedComponent } from './check-if-connected.component';

describe('CheckIfConnectedComponent', () => {
  let component: CheckIfConnectedComponent;
  let fixture: ComponentFixture<CheckIfConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckIfConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckIfConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
