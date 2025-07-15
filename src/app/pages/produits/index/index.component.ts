import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QProduit } from '../interfaces';
import { ProduitService } from '../produit.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'src/app/material.module';
import { ProduitTableComponent } from "src/app/components/produit-table/produit-table.component";

@Component({
  selector: 'app-index',
  imports: [MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule
    , ProduitTableComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
}