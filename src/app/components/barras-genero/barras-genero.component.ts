import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barras-genero',
  templateUrl: './barras-genero.component.html',
  styleUrls: ['./barras-genero.component.css']
})
export class BarrasGeneroComponent implements OnInit {

  datosGenero ={
    masculino: 20,
    femenino: 40
  }
  
  public barChartOptions: ChartOptions = { 
    responsive: true
  }

  public barChartLabels: Label[] = ['Género de pacientes'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {data: [this.datosGenero.masculino], label: 'Hombres'},
    {data: [0], label: ''},
    {data: [this.datosGenero.femenino], label: 'Mujeres'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    
  }

}
