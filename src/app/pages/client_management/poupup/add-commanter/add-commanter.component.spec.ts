import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommanterComponent } from './add-commanter.component';

describe('AddCommanterComponent', () => {
  let component: AddCommanterComponent;
  let fixture: ComponentFixture<AddCommanterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommanterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommanterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
