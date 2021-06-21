import { Component, Input, OnInit } from '@angular/core';
import { ConsultasService } from '../../consultas/consultas.service';
import { PacientesService } from '../../registro-pacientes/pacientes-service';
import { ExpedientesService } from '../expediente.service';

@Component({
  selector: 'app-consulta-activa',
  templateUrl: './consulta-activa.component.html',
  styleUrls: ['./consulta-activa.component.css']
})
export class ConsultaActivaComponent implements OnInit {
  @Input() solicitud: any;

  paciente: any = [];
  expediente: any = [];

  constructor(private _pacientesService: PacientesService,
    private _expedientesService: ExpedientesService,
    private _consultasService: ConsultasService
  ) {}

  ngOnInit(): void {
    console.log(this.solicitud);
    this.getPaciente();
    this.getExpediente();
  }

  async getPaciente(){
    //Realizamos la solicitud HTTP de tipo GET para obtener todos los pacientes
    this.paciente = await this._pacientesService.getByID(Number(this.solicitud['ID'])).toPromise();
    //La propiedad array de la respuesta es la que tiene la información
    this.paciente = this.paciente.array;
    console.log(this.paciente);
  }

  async getExpediente(){
    this.expediente = await this._expedientesService.getByID(Number(this.solicitud['ID'])).toPromise();
    console.log(this.expediente);
    
  }

  async sendData(){
    //Creamos la consulta en la BD y obtenemos el ID asignado
    let response = await this._consultasService.create(this.solicitud.solicitud).toPromise();
    let consultaID = response.array.insertId;
    console.log(consultaID);

    //Expediente nuevo a ingresar en la BD
    let newExpediente = {
      ID_Paciente: 9,
      ID_Consulta: 3,
      Resultado: "Por definir"
    }

    //Registramos el expediente
    let resultado = await this._expedientesService.create(newExpediente).toPromise();
    console.log(resultado);
  }

}
