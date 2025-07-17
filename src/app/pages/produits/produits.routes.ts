import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

// ui
export const ProduitsRoutes: Routes = [
  {
    path: '',
    data: { title: 'Produits' },
    children: [
      {
        path: 'i',
        component: IndexComponent,
        data: { title: '📦 Liste des Produits' }
      },
      {
        path: 'c',
        component: CreateComponent,
        data: { title: '➕ Créer un Produit' }
      },
       {
        path: 'i/:id',
        component: UpdateComponent,
        data: { title: 'Mettre a jour un Produit' }
      },
      {
        path: ':id',
        component: ShowComponent,
        data: { title: '🔍 Détails du Produit' }
      }
    ]
  }
];