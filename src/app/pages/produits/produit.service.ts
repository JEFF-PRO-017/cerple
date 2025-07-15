import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { Produit, TrackingProduit, ProduitAvecUtilisateur } from './interfaces';

@Injectable({ providedIn: 'root' })
export class ProduitService {
  private produitUrl = 'http://localhost:3000/produits';
  private trackingUrl = 'http://localhost:3000/trackingProduits';

  constructor(private http: HttpClient) {}

  createProduit(data: Omit<Produit, 'id' | 'date'>): Observable<Produit> {
    const produit: Produit = {
      ...data,
      id: uuidv4(),
      date: new Date(),
    };

    const tracking: TrackingProduit = {
      id: uuidv4(),
      idProduit: produit.id,
      quantite: produit.quantite,
      date: produit.date,
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

  getProduitsPagines(page: number, limit: number): Observable<ProduitAvecUtilisateur[]> {
    const params = new HttpParams().set('_page', page).set('_limit', limit).set('_expand', 'utilisateur');
    return this.http.get<ProduitAvecUtilisateur[]>(this.produitUrl, { params });
  }
}
