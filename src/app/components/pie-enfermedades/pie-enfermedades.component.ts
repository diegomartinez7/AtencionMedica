import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-enfermedades',
  templateUrl: './pie-enfermedades.component.html',
  styleUrls: ['./pie-enfermedades.component.css']
})
export class PieEnfermedadesComponent implements OnInit {

  Tipos = {
    cardio: 76,
    infecciosas: 40,
    nervioso: 30,
    virales: 12
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };

  public pieChartLabels: Label[] = ['Cardio respiratorias', 'Infecciosas', 'Del sistema nervioso', 'Virales'];
  public pieChartData: number[] = [this.Tipos.cardio,this.Tipos.infecciosas,this.Tipos.nervioso,this.Tipos.virales];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(231,242,66,0.3)', 'rgba(243,58,46,0.3)', 'rgba(46,73,243,0.3)', 'rgba(45,240,39 ,0.3)'],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
