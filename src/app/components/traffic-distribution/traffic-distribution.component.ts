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
import { ProduitService } from 'src/app/pages/produits/produit.service';
import { countProduits } from 'src/app/pages/produits/interfaces';

export interface trafficdistributionChart {
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
  selector: 'app-traffic-distribution',
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './traffic-distribution.component.html',
})
export class AppTrafficDistributionComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public trafficdistributionChart!: Partial<trafficdistributionChart> | any;

  produitsPeremption!: countProduits;
  produitsValide!: countProduits

  constructor(private produitService: ProduitService) { }
 
  ngOnInit(): void {
    this.produitService.getTotalProduitValide().subscribe({
      next: (resultat) => {
        this.produitsValide = resultat;
        this.chartStock()
        console.log('Produits en voie de péremption :', resultat);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits en voie de péremption :', err);
      }
    });

  }


  chartStock() {

    this.trafficdistributionChart = {
      series: [this.produitsValide.cathegorie?.kit??0, this.produitsValide.cathegorie?.comprimee??0, this.produitsValide.cathegorie?.marteriaux??0],
      labels: ['K', 'C', 'M'],
      chart: {
        type: 'donut',
        fontFamily: "inherit",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 160,
      },
      colors: ['#4bd08b', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                color: undefined,
                offsetY: 5,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };
  }
}
