import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { forkJoin, map, Observable } from 'rxjs';
import { Produit, TrackingProduit, QProduit, Utilisateur } from './interfaces';

@Injectable({ providedIn: 'root' })
export class ProduitService {
  private produitUrl = 'http://localhost:3000/produits';
  private trackingUrl = 'http://localhost:3000/trackingProduits';
  private utilisateurUrl = 'http://localhost:3000/utilisateurs';

  constructor(private http: HttpClient) { }

  createProduit(data: Omit<Produit, 'id' | 'dateCreation'>): Observable<Produit> {
    const produit: Produit = {
      ...data,
      id: uuidv4(),
      dateCreation: new Date(),
    };

    const tracking: TrackingProduit = {
      id: uuidv4(),
      idProduit: produit.id,
      quantite: produit.quantite,
      dateCreation: produit.dateCreation,
      source: produit.source,
      destination: 'cerple',
    };
    // Ajoute le produit puis crée le tracking
    return new Observable((observer) => {
      this.http.post<Produit>(this.produitUrl, produit).subscribe({
        next: (created) => {
          this.http.post(this.trackingUrl, tracking).subscribe(() => {
            observer.next(created);
            observer.complete();
          });
        },
        error: (err) => observer.error(err),
      });
    });
  }


  getProduitsParCategorie(cathegorie: string, page: number, limit: number): Observable<QProduit[]> {
    const params = new HttpParams()
      .set('cathegorie', cathegorie)
      .set('_sort', 'date')
      .set('_order', 'asc')
      .set('_page', page)
      .set('_limit', limit);

    const produits$ = this.http.get<Produit[]>(this.produitUrl, { params });
    const utilisateurs$ = this.http.get<Utilisateur[]>(this.utilisateurUrl);

    return forkJoin([produits$, utilisateurs$]).pipe(
      map(([produits, utilisateurs]) => {
        return produits.map(produit => {
          const utilisateur = utilisateurs.find(u => u.id === produit.utilisateurId);
          return {
            ...produit,
            utilisateur: utilisateur!,
          } as unknown as QProduit;
        });
      })
    );
  }

}
