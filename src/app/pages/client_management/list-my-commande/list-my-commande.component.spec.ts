import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyCommandeComponent } from './list-my-commande.component';

describe('ListMyCommandeComponent', () => {
  let component: ListMyCommandeComponent;
  let fixture: ComponentFixture<ListMyCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
