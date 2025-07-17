import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { QProduit } from 'src/app/pages/produits/interfaces';
import { ProduitService } from 'src/app/pages/produits/produit.service';

@Component({
  selector: 'app-produit-table',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './produit-table.component.html',
  styleUrl: './produit-table.component.scss'
})
export class ProduitTableComponent implements OnInit {
  @Input() cathegorie!: string;

  dataSource = new MatTableDataSource<QProduit>();
  displayedColumns: string[] = ['Responsable', 'produit', 'emplacement', 'quantite', 'description', 'actions'];
  total = 0;
  pageSize = 5;
  pageIndex = 0;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.loading = true;
    const page = this.pageIndex + 1;

    this.produitService.getProduitsParCategorie(this.cathegorie, page, this.pageSize)
      .subscribe((data) => {
        debugger
        this.dataSource.data = data;
        this.total = 50; // ou dynamique avec `X-Total-Count`
        this.loading = false;
      });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProduits();
  }
  
  viewmore(produitId: string) {
      this.router.navigateByUrl(`produits/${produitId}`)
  }
  out(produitId: string) {
      this.router.navigateByUrl(`produits/i/${produitId}`)
  }
}