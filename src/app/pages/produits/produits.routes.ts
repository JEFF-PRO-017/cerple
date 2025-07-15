import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { CreateComponent } from './create/create.component';

// ui
export const PeoduitsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'i',
        component: IndexComponent,
      },
      {
        path: 's',
        component: ShowComponent,
      },
      {
        path: 'c',
        component: CreateComponent,
      },
    ],
  },
];
