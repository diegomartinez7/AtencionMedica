import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PacientesService } from '../registro-pacientes/pacientes-service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from './consultas.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  animations: [
    trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ConsultasComponent implements OnInit {
  filtroPaciente: any;
  pacientes: any = [];
  consultas: any = [];

  consultaColumnas: string[] = ['Apellidos', 'Nombre', 'Fecha', 'Peso', 'Talla', 'Temperatura', 'Presion_A', 'Pulso'];
  dataSourceConsultas = new MatTableDataSource<any>();
  expandedEvent: any | null;

  constructor(private _pacientesService: PacientesService,
    private _consultasService: ConsultasService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    //Realizamos la solicitud HTTP de tipo GET para obtener todos los pacientes
    this.pacientes = await this._pacientesService.getAll().toPromise();
    //La propiedad array de la respuesta es la que tiene la información
    this.pacientes = this.pacientes.array.map((paciente: any) => {
      return {
        'ID': paciente['ID'],
        'Nombre': paciente.Nombre,
        'Apellidos': paciente.Apellidos
      };
    });
    console.log(this.pacientes);

    //Realizamos la solicitud HTTP de tipo GET para obtener todas las consultas
    this.consultas = await this._consultasService.getAll().toPromise();
    this.consultas = this.consultas.array;
    console.log(this.consultas);

   //Asignamos la información al dataSource que usará el mat-table
    this.dataSourceConsultas.data = this.consultas;
  }

  async filtrarConsultas(valor: any){
    if(valor=='Todos'){
      this.getData();
    }
    else{
      let consultas = await this._consultasService.getByID(Number(valor)).toPromise();
      this.dataSourceConsultas.data = consultas.array;
    }

    //Refrescamos los cambios para el mat-table
    this.cdr.markForCheck();
  }

  async hacerConsulta(){
    const modalRespuesta = await this.dialog.open(ModalComponent, {
      //Establecemos la información a mandarle al modal
      data: {
        tipo: "Consulta" //AQUÍ SE MANDA QUE EL MODAL SEA DE REGISTRO DE CONSULTA
      },
      width: 'auto',
      height: 'auto'
    }).afterClosed().toPromise();

    console.log(modalRespuesta);
  }

}
