import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { ProduitService } from '../produit.service';
import { TrackingProduit } from '../interfaces';
import { PageEvent } from '@angular/material/paginator';

interface stats {
  id: number;
  color: string;
  title: string;
  subtitle: string;
  img: string;
  percent: string;
}

interface stats2 {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}
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
  selector: 'app-show',
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule, CommonModule, MatMenuModule, MaterialModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {
  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;
  stats2: TrackingProduit[] = [];
  produitId: string = ' '

  produit = {
    id: 'N/D',
    nom: 'N/D',
    numeroLot: 0,
    quantite: 0,
    cathegorie: 'N/D',
    emplacement: 'N/D',
    source: 'N/D',
    description: 'N/D',
    date: new Date('2025-07-15T04:52:56.288Z'),
    utilisateur: {
      id: 'N/D',
      nom: 'N/D',
      email: 'N/D',
      avatar: '/assets/images/profile/user-1.jpg',
      role: 'N/D'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produitId = this.route.snapshot.paramMap.get('id') ?? ''
    this.loadTracking()
    this.getTotalItems()
    this.getproduit()
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadTracking();
  }

  trackByTime(index: number, item: any) {
    return item.date;
  }

  displayedColumns: string[] = ['profile', 'hrate', 'skills', 'status'];
  dataSource = ELEMENT_DATA;
  stats: any[] = [
    {
      id: 1,
      color: 'primary',
      title: 'Paypal',
      subtitle: 'Big Brands',
      img: 'assets/images/svgs/icon-paypal.svg',
      percent: '6235',
    },
    {
      id: 2,
      color: 'success',
      title: 'Wallet',
      subtitle: 'Bill payment',
      img: 'assets/images/svgs/icon-office-bag.svg',
      percent: '345',
    },
    {
      id: 3,
      color: 'warning',
      title: 'Credit Card',
      subtitle: 'Money reversed',
      img: 'assets/images/svgs/icon-master-card.svg',
      percent: '2235',
    },
    {
      id: 4,
      color: 'error',
      title: 'Refund',
      subtitle: 'Bill Payment',
      img: 'assets/images/svgs/icon-pie.svg',
      percent: '32',
    },
  ];


  loadTracking(): void {
    this.produitService.getTrackingByProduitId(this.produitId, this.pageIndex, this.pageSize).subscribe((list) => {
      this.stats2 = list
          console.warn("loaddata")
    });
  }

  getTotalItems() {
    this.produitService.getTotalTrackingsByProduitId(this.produitId).subscribe((total) => {
      this.totalItems = total
    });
  }


  getproduit() {
    this.produitService.getProduitsParId(this.produitId).subscribe((produit) => {
      this.produit = produit[0]
    });
  }
  out() {
    this.router.navigateByUrl(`produits/i/${this.produitId}`)
  }
}
