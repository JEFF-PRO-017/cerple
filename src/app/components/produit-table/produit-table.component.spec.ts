import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitTableComponent } from './produit-table.component';

describe('ProduitTableComponent', () => {
  let component: ProduitTableComponent;
  let fixture: ComponentFixture<ProduitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
