import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Produit } from 'src/app/pages/produits/interfaces';
import { ProduitService } from 'src/app/pages/produits/produit.service';

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


@Component({
  selector: 'app-upcoming-schedules',
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule,
    CommonModule, MatMenuModule, MaterialModule
  ],
  templateUrl: './upcoming-schedules.component.html',
})
export class AppUpcomingSchedulesComponent {
  produitsFaibleQuantite: Produit[] = [];

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getTop5ProduitsFaibleQuantiteNonExpire().subscribe({
      next: (produits) => {
        this.produitsFaibleQuantite = produits;
        console.log('Produits avec faible quantité non expirés :', produits);
      },
      error: (err) => {
        console.error('Erreur de récupération :', err);
      }
    });
  }

  stats: stats[] = [
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

  stats2: stats2[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
  ];
}
