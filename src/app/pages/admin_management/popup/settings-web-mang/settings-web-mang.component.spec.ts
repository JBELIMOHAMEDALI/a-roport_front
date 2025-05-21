import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWebMangComponent } from './settings-web-mang.component';

describe('SettingsWebMangComponent', () => {
  let component: SettingsWebMangComponent;
  let fixture: ComponentFixture<SettingsWebMangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsWebMangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWebMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
