import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestConnectionComponent } from './firest-connection.component';

describe('FirestConnectionComponent', () => {
  let component: FirestConnectionComponent;
  let fixture: ComponentFixture<FirestConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirestConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
