import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PacientesService } from '../registro-pacientes/pacientes-service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../iniciosesion/usuarios.service';
import { Router } from '@angular/router';

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
  expedientes: any = [];

  expedienteColumnas: string[] = ['Apellidos', 'Nombre', 'Genero', 'Edad', 'Poblacion', 'Enfermedades', 'Resultados'];
  dataSourceExpedientes = new MatTableDataSource<any>();
  expandedEvent: any | null;

  constructor(private _pacientesService: PacientesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPacientes();
  }

  async getPacientes(){
    //Realizamos la solicitud HTTP de tipo GET para obtener todos los expedientes
    this.pacientes = await this._pacientesService.getAll().toPromise();
    //La propiedad array de la respuesta es la que tiene la información
    this.pacientes = this.pacientes.array;

    /* 
    //Así es como puedes recorrer elemento por elemento del array que tiene la información
    this.pacientes.forEach((paciente: any) => {
      console.log(paciente);
    }); 
    */

   //Asignamos la información al dataSource que usará el mat-table
    this.dataSourceExpedientes.data = this.pacientes;
  }

  registrarPaciente(){
    //REDIRIGIR A REGISTRO DE PACIENTES O ABRIR UN MODAL Y TENER EL REGISTRO EMBEBIDO
    this.router.navigateByUrl('/registro_paciente');

    //Después de registrar otro expediente volvemos a obtenerlos para actualizar los registros
    /* this.getPacientes();
    this.cdr.markForCheck();  //refrescamos los cambios para la tabla */
  }

}
