import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMangComponent } from './store-mang.component';

describe('StoreMangComponent', () => {
  let component: StoreMangComponent;
  let fixture: ComponentFixture<StoreMangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
