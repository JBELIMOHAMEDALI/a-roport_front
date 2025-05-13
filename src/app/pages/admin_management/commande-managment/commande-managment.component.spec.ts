import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeManagmentComponent } from './commande-managment.component';

describe('CommandeManagmentComponent', () => {
  let component: CommandeManagmentComponent;
  let fixture: ComponentFixture<CommandeManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
