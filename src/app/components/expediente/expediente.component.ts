import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExpedientesService } from './expediente.service';
import { PacientesService } from '../registro-pacientes/pacientes-service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css'],
  animations: [
    trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ExpedienteComponent implements OnInit {
  pacientes: any = [];
  historial: any = [];

  expedienteColumnas: string[] = ['Apellidos', 'Nombre', 'Genero', 'Edad', 'Poblacion', 'Enfermedades', 'Resultados'];
  dataSourceExpedientes = new MatTableDataSource<any>();
  expandedEvent: any | null;

  constructor(private _expedientesService: ExpedientesService,
    private _pacientesService: PacientesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getPaciente();
    await this.getExpedientes();
  }

  async getPaciente(){
    //Realizamos la solicitud HTTP de tipo GET para obtener todos los pacientes
    this.pacientes = await this._pacientesService.getAll().toPromise();
    //La propiedad array de la respuesta es la que tiene la información
    this.pacientes = this.pacientes.array;
  }

  async getExpedientes(){
    //Realizamos la solicitud HTTP de tipo GET para obtener todos los expedientes
    let expediente = [];
    await this.pacientes.forEach(async(paciente: any) => {
      expediente = await this._expedientesService.getByID(paciente['ID']).toPromise();
      paciente.consultas = await expediente.consultas;
    });

   //Asignamos la información al dataSource que usará el mat-table
    this.dataSourceExpedientes.data = await this.pacientes;
    console.log(this.dataSourceExpedientes.data);
  }

  registrarPaciente(){
    //Redirigimos a la página para registro de paciente
    this.router.navigateByUrl('/registro_paciente');
  }

}
