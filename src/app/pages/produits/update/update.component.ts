import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProduitService } from '../produit.service';
import { Produit } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    CommonModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,

  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  produitForm!: FormGroup;
  produit!: Produit
  isLoading = true;

  destinations: { value: string, name: string }[] = [
    { value: 'cerple', name: 'CERPLE' },
    { value: 'hopital_central', name: 'Hôpital Central' },
    { value: 'hopital_general', name: 'Hôpital Général' },
    { value: 'pharmacie_interne', name: 'Pharmacie Interne' },
    { value: 'bloc_operatoire', name: 'Bloc Opératoire' },
    { value: 'urgence', name: 'Service des Urgences' },
    { value: 'pediatrie', name: 'Service de Pédiatrie' },
    { value: 'gynecologie', name: 'Service de Gynécologie' },
    { value: 'oncologie', name: 'Service d’Oncologie' },
    { value: 'don', name: 'Don ou Aide Humanitaire' },
    { value: 'autre', name: 'Autre (préciser)' }
  ];


  constructor(private fb: FormBuilder,
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduit(this.route.snapshot.paramMap.get('id') ?? '')
  }

  groupFomrs(produitExistant: Produit) {
    this.produitForm = this.fb.group({
      nom: [{ value: produitExistant.nom, disabled: true }],
      numeroLot: [{ value: produitExistant.numeroLot, disabled: true }],
      cathegorie: [{ value: produitExistant.cathegorie, disabled: true }],
      emplacement: [{ value: produitExistant.emplacement, disabled: true }],
      dateExpiration: [{ value: produitExistant.dateExpiration, disabled: true }],
      description: [{ value: produitExistant.description, disabled: true }],
      quantite: [produitExistant.quantite, [Validators.required, Validators.min(1), Validators.max(produitExistant.quantite)]],
      destination: [null, Validators.required],
    });
  }

  getProduit(produitId: string) {
    this.produitService.getProduitById(produitId).subscribe({
      next: (produit) => {
        this.produit = produit
        this.groupFomrs(produit)
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = true;
      }
    });
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      const data = this.produitForm.value
      this.produitService.updateProduit(this.produit, data.quantite, data.destination).subscribe({
        next: () => {
          alert('mise a jour avec succès')
          this.produitForm.reset()
          this.location.back();
        },
        error: () => alert('Erreur lors de la mise a jour'),
      });
    }
  }
}