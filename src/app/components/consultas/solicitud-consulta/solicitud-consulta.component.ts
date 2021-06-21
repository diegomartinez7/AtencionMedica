import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { PacientesService } from '../../registro-pacientes/pacientes-service';
import { ConsultasService } from '../consultas.service';

@Component({
  selector: 'app-solicitud-consulta',
  templateUrl: './solicitud-consulta.component.html',
  styleUrls: ['./solicitud-consulta.component.css']
})
export class SolicitudConsultaComponent implements OnInit {
  soloTexto = /^[a-zA-Z\s]*$/;
  soloNumeros = /^\d+$/;

  pacientes: any = [];
  pacienteID: any;

  permitirLlamada: boolean = false;

  formRegistro = this.formBuilder.group({
    Fecha: ['',[Validators.required]],
    Malestar: ['',[Validators.required,Validators.pattern(this.soloTexto)]],
    Peso:['',[Validators.required, Validators.pattern(this.soloNumeros)]],
    Talla: ['',[Validators.required, Validators.pattern(this.soloNumeros)]],
    Temperatura:['',[Validators.required, Validators.pattern(this.soloNumeros)]],
    Presion_A:['',[Validators.required]],
    Pulso: ['', [Validators.required, Validators.pattern(this.soloNumeros)]],
  });

  constructor(private formBuilder: FormBuilder,
    private _pacientesService: PacientesService,
    private _consultasService: ConsultasService
  ) {}

  ngOnInit(): void {
    this.getPacientes();
  }

  isValidField(field: string){
    return (this.formRegistro.get(field)?.touched && this.formRegistro.get(field)?.invalid);
  }

  clearForm(){
    this.formRegistro.reset();
  }

  async getPacientes(){
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
  }

  obtenerPaciente(valor: any){
    this.pacienteID = valor;
  }

  async sendData(){
    if(this.pacienteID != ""){
      this.permitirLlamada = true;

      let data = this.formRegistro.getRawValue();
      data.Malestar = data.Malestar?.trim();
      data.Diagnostico = "";
      data.Nota = "";
      console.log(data);
      
      this.pacienteID = Number(this.pacienteID);
      try {
        await this._consultasService.sendRequest(this.pacienteID, data).toPromise();
      } catch (error) {
        console.log(error.err);
      }
    }

  }

}
