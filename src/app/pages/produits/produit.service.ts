import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { forkJoin, map, Observable } from 'rxjs';
import { Produit, TrackingProduit, QProduit, Utilisateur, countProduits, ProduitsParMoisAvecTotal } from './interfaces';

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

  updateProduit(data: Produit, qteDebit: number, destination: string): Observable<Produit> {

    const tracking: TrackingProduit = {
      id: uuidv4(),
      idProduit: data.id,
      quantite: qteDebit,
      dateCreation: new Date(),
      source: 'cerple',
      destination: destination,
    };

    // Mettre à jour  le produit puis crée le tracking
    return new Observable((observer) => {
      this.http.patch<Produit>(`${this.produitUrl}/${data.id}`, { quantite: data.quantite - qteDebit }).subscribe({
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

  getProduitById(id: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.produitUrl}/${id}`);
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

  getProduitsParId(id: string): Observable<QProduit[]> {
    const params = new HttpParams()
      .set('id', id)


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



  getTrackingByProduitId(
    produitId: string,
    page: number,
    limit: number
  ): Observable<TrackingProduit[]> {
    const params = new HttpParams()
      .set('idProduit', produitId)
      .set('_sort', 'dateCreation')
      .set('_order', 'desc')
      .set('_page', page)
      .set('_limit', limit);
    return this.http.get<TrackingProduit[]>(this.trackingUrl, { params });
  }

  getTotalTrackingsByProduitId(produitId: string): Observable<number> {
    const params = new HttpParams().set('idProduit', produitId);

    return this.http.get<any[]>(this.trackingUrl, { params }).pipe(
      map((trackings) => trackings.length)
    );
  }

  getTotalProduitValide(): Observable<countProduits> {
    return this.http.get<any[]>(this.produitUrl).pipe(
      map(produits => this.traiterProduits(produits))
    );
  }

  traiterProduits(produits: any[]): countProduits {
    const maintenant = new Date();
    const dateLimite = new Date();
    dateLimite.setMonth(maintenant.getMonth() + 5); // il y a 5 mois

    const produitsRecents = produits.filter(p => new Date(p.dateExpiration) > dateLimite || !p.dateExpiration);

    const cathegorie: { [key: string]: number } = {};
    produitsRecents.forEach(p => {
      cathegorie[p.cathegorie] = (cathegorie[p.cathegorie] || 0) + 1;
    });

    return {
      total: produitsRecents.length,
      cathegorie
    };
  }

  getProduitsParMoisDePeremption(): Observable<ProduitsParMoisAvecTotal> {
    return this.http.get<any[]>(this.produitUrl).pipe(
      map(produits => this.traiterProduitsParMois(produits))
    );
  }

  traiterProduitsParMois(produits: any[]): ProduitsParMoisAvecTotal {
    const maintenant = new Date();

    // Initialiser les compteurs mois1 à mois5 et total
    const result: ProduitsParMoisAvecTotal = {
      total: 0,
      mois1: 0,
      mois2: 0,
      mois3: 0,
      mois4: 0,
      mois5: 0
    };

    produits.forEach(p => {
      const dateProduit = new Date(p.dateExpiration);

      if (dateProduit > maintenant) {
        const diffMois = (dateProduit.getFullYear() - maintenant.getFullYear()) * 12
          + (dateProduit.getMonth() - maintenant.getMonth());

        if (diffMois >= 0 && diffMois < 5) {
          const key = `mois${diffMois + 1}` as keyof ProduitsParMoisAvecTotal;
          result[key]++;
          result.total++;
        }
      }
    });

    return result;
  }


  getTop5ProduitsFaibleQuantiteNonExpire(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.produitUrl).pipe(
      map(produits => {
        const aujourdHui = new Date();

        return produits
          .filter(p => new Date(p.dateExpiration) > aujourdHui || !p.dateExpiration)           // Non expiré
          .sort((a, b) => a.quantite - b.quantite)              // Trier par quantité croissante
          .slice(0, 5);                                         // Prendre les 5 premiers
      })
    );
  }

  getTop5ProduitsPlusProchesPeremption(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.produitUrl).pipe(
      map(produits => {
        const maintenant = new Date();

        return produits
          .filter(p => new Date(p.dateExpiration) < maintenant &&p.dateExpiration ) // seulement les non expirés
          .sort((a, b) => new Date(a.dateExpiration).getTime() - new Date(b.dateExpiration).getTime()) // du plus proche au plus lointain
          .slice(0, 5); // garder les 5 premiers
      })
    );
  }


}
