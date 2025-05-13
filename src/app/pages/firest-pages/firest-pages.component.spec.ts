import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestPagesComponent } from './firest-pages.component';

describe('FirestPagesComponent', () => {
  let component: FirestPagesComponent;
  let fixture: ComponentFixture<FirestPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirestPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
