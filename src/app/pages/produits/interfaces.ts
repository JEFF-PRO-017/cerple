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
  idUtilisateur: string;
  date: Date;
  numeroLot: number;
  nom: string;
  quantite: number;
  description: string;
  cathegorie: string;
  emplacement: string;
  source: string;
}

export interface ProduitAvecUtilisateur extends Omit<Produit, 'idUtilisateur'> {
  utilisateur: Utilisateur;
}

export interface TrackingProduit {
  id: string;
  idProduit: string;
  quantite: number;
  date: Date;
  source: string;
  destination: string;
}
