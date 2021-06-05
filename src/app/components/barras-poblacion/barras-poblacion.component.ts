import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barras-poblacion',
  templateUrl: './barras-poblacion.component.html',
  styleUrls: ['./barras-poblacion.component.css']
})
export class BarrasPoblacionComponent implements OnInit {

  poblacion ={
    rural: 46,
    urbano: 67
  }
  
  public barChartOptions: ChartOptions = { 
    responsive: true
  }

  public barChartLabels: Label[] = ['Población de pacientes'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {data: [this.poblacion.rural], label: 'Rural'},
    {data: [0], label: ''},
    {data: [this.poblacion.urbano], label: 'Urbano'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
