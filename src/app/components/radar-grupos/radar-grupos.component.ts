import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-radar-grupos',
  templateUrl: './radar-grupos.component.html',
  styleUrls: ['./radar-grupos.component.css']
})
export class RadarGruposComponent implements OnInit {

  grupos = {
    ninos: 15,
    adolescentes: 30,
    adultos: 35,
    ancianos: 26
  }
  
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Niños', 'Adolescentes', 'Adultos', 'Adultos mayores'];

  public radarChartData: ChartDataSets[] = [
    { data: [this.grupos.ninos,this.grupos.adolescentes,this.grupos.adultos,this.grupos.ancianos], label: 'Grupos de población por edad atendidos' }
  ];

  public radarChartType: ChartType = 'radar';


  constructor() { }

  ngOnInit(): void {
  }

}
