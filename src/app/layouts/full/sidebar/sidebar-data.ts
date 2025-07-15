import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
    bgcolor: 'primary',
  },
  {
    navCap: 'Ui PRODUITS',
  },
  {
    displayName: 'Nouveau Produit',
    iconName: 'clipboard-text',
    route: '/produits/c',
    bgcolor: 'warning',
  },
  {
    displayName: 'Liste Produits',
    iconName: 'list-details',
    route: '/produits/i',
    bgcolor: 'success',
  },

  {
    navCap: 'Ui UTILISATEURS',
  },
  {
    displayName: 'Nouveau',
    iconName: 'clipboard-text',
    route: '/ui-components/forms',
    bgcolor: 'warning',
  },
  {
    displayName: 'Listes',
    iconName: 'list-details',
    route: '/ui-components/tables',
    bgcolor: 'success',
  },

  {
    navCap: 'Ui OTHERS',
  },

  {
    displayName: 'Badge',
    iconName: 'archive',
    route: '/ui-components/badge',
    bgcolor: 'warning',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: '/ui-components/chips',
    bgcolor: 'success',
  },
  {
    displayName: 'Lists',
    iconName: 'list-details',
    route: '/ui-components/lists',
    bgcolor: 'error',
  },
  {
    displayName: 'Menu',
    iconName: 'file-text',
    route: '/ui-components/menu',
    bgcolor: 'primary',
  },
  {
    displayName: 'Tooltips',
    iconName: 'file-text-ai',
    route: '/ui-components/tooltips',
    bgcolor: 'secondary',
  },
  {
    displayName: 'Forms',
    iconName: 'clipboard-text',
    route: '/ui-components/forms',
    bgcolor: 'warning',
  },
  {
    displayName: 'Tables',
    iconName: 'table',
    route: '/ui-components/tables',
    bgcolor: 'success',
  },


  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
    bgcolor: 'error',
  },
  {
    displayName: 'Sample Page',
    iconName: 'brand-dribbble',
    route: '/extra/sample-page',
    bgcolor: 'primary',
  },
  {
    navCap: 'Forms',
  },


  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    bgcolor: 'secondary',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
        iconName: 'point',
        bgcolor: 'tranparent',
        route: '/authentication/login',
      },

    ],
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    bgcolor: 'warning',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
        iconName: 'point',
        bgcolor: 'tranparent',
        route: '/authentication/register',
      },

    ],
  },


];
