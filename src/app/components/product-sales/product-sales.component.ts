import { Component, OnInit, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { countProduits, ProduitsParMoisAvecTotal } from 'src/app/pages/produits/interfaces';
import { ProduitService } from 'src/app/pages/produits/produit.service';

export interface productsalesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-product-sales',
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './product-sales.component.html',
})
export class AppProductSalesComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public productsalesChart!: Partial<productsalesChart> | any;

  produitsPeremption!: ProduitsParMoisAvecTotal;

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getProduitsParMoisDePeremption().subscribe({
      next: (resultat) => {
        this.produitsPeremption = resultat;
        this.chartStock()
        console.log('Produits en voie de péremption :', resultat);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits en voie de péremption :', err);
      }
    });

  }

  chartStock(): void {
    const data = this.produitsPeremption
    this.productsalesChart = {
      series: [
        {
          name: 'Qte/Mois',
          color: '#fb977d',
          data: [data.mois1 ?? 0, data.mois2 ?? 0, data.mois3 ?? 0, data.mois4 ?? 0, data.mois5 ?? 0],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "inherit",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#fb977d'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }

}
