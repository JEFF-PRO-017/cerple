// types.ts
export type Categorie = 'comprimee' | 'kit' | 'marteriaux';
export type Emplacement = 'bloc1' | 'bloc2' | 'bloc3' | 'bloc4' | 'bloc5' | 'bloc6';
export type Source = 'cerple' | 'autres';
export type Destination = 'cerple';

export interface Utilisateur {
  id: string;
  nom: string;
  avatar: string;
  email: string;
  role: string;
}

export interface Produit {
  id: string;
  utilisateurId: string;
  dateCreation: Date;
  numeroLot?: number;
  nom: string;
  quantite: number;
  description: string;
  cathegorie: string;
  emplacement: string;
  source: string;
  dateExpiration:any
}



export interface TrackingProduit {
  id: string;
  idProduit: string;
  quantite: number;
  dateCreation: Date;
  source: string;
  destination: string;
}
export interface QProduit {
  id: string;
  utilisateur: {
     id: string;
    nom: string;
    avatar: string;
    email: string;
    role: string;
  };
  dateExpiration:any
  date: Date;
  numeroLot: number;
  nom: string;
  quantite: number;
  description: string;
  cathegorie: 'comprimee' | 'kit' | 'marteriaux';
  emplacement: 'bloc1' | 'bloc2' | 'bloc3' | 'bloc4' | 'bloc5' | 'bloc6';
  source: 'cerple' | 'autres';
}
