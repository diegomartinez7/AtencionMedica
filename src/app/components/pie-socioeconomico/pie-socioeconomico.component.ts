import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-socioeconomico',
  templateUrl: './pie-socioeconomico.component.html',
  styleUrls: ['./pie-socioeconomico.component.css']
})
export class PieSocioeconomicoComponent implements OnInit {

  claseEconomica = {
    baja: 76,
    media: 40,
    alta: 30
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };

  public pieChartLabels: Label[] = ['Baja', 'Media', 'Alta'];
  public pieChartData: number[] = [this.claseEconomica.baja,this.claseEconomica.media,this.claseEconomica.alta];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
