import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProduitService } from '../produit.service';
import { Produit } from '../interfaces';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create',
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
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder, private produitService: ProduitService) { }

  today = new Date();
  produitForm = this.fb.group({
    nom: ['', Validators.required],
    numeroLot: [null],
    dateExpiration: [null, [this.optionalMinDateValidator(this.today)]],
    quantite: [null, [Validators.required, Validators.min(1)]],
    cathegorie: ['', Validators.required],
    emplacement: ['', Validators.required],
    source: ['Others'],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });
  todayString: string = this.today.toISOString().split('T')[0];

  ngOnInit(): void { }

  onSubmit() {
    if (this.produitForm.valid) {
      const raw = this.produitForm.getRawValue(); // inclut même les champs désactivés
      const utilisateurId = 'u-001'

      if (this.produitForm.valid) {
        const produitData: Omit<Produit, 'id' | 'dateCreation'> = {
          utilisateurId,
          nom: raw.nom ?? '',
          numeroLot: raw.numeroLot ?? 0,
          quantite: raw.quantite ?? 0,
          cathegorie: raw.cathegorie ?? 'comprimee',
          emplacement: raw.emplacement ?? 'bloc1',
          source: raw.source ?? 'cerple',
          description: raw.description ?? '',
          dateExpiration: raw.dateExpiration
        };

        this.produitService.createProduit(produitData).subscribe({
          next: () => {
            alert('Produit créé avec succès')
            this.produitForm.reset()
          },
          error: () => alert('Erreur lors de la création'),
        });
      }
    }
  }

  optionalMinDateValidator(minDate: Date): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null; // Si vide, c'est valide

      const selectedDate = new Date(control.value);
      return selectedDate >= minDate ? null : { minDate: true };
    };
  }
}
