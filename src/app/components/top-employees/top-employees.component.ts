import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';
import { ProduitService } from 'src/app/pages/produits/produit.service';
import { Produit } from 'src/app/pages/produits/interfaces';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  hrate: number;
  skills: string;
  priority: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Mark J. Freeman',
    position: 'Developer',
    skills: 'HTML',
    hrate: 80,
    priority: 'Available',
    progress: 'success',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Nina R. Oldman',
    position: 'Designer',
    skills: 'JavaScript',
    hrate: 70,
    priority: 'On Holiday',
    progress: 'primary',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Arya H. Shah',
    position: 'Developer',
    skills: 'React',
    hrate: 40,
    priority: 'Absent',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'June R. Smith',
    position: 'Designer',
    skills: 'Vuejs',
    hrate: 20,
    priority: 'On Leave',
    progress: 'warning',
  },
];

@Component({
  selector: 'app-top-employees',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MaterialModule],
  templateUrl: './top-employees.component.html',
})
export class AppTopEmployeesComponent {
  displayedColumns: string[] = ['nom', 'quantite', 'emplacement','date'];
  dataSource!:Produit[]

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getTop5ProduitsPlusProchesPeremption().subscribe({
      next: (produits) => {
        this.dataSource = produits;
        console.log('Top 5 produits les plus proches de la péremption :', produits);
      },
      error: (err) => {
        console.error('Erreur de récupération des produits en péremption :', err);
      }
    });
  }



}
