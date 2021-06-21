import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { PacientesService } from './pacientes-service';

@Component({
  selector: 'app-registro-pacientes',
  templateUrl: './registro-pacientes.component.html',
  styleUrls: ['./registro-pacientes.component.css']
})
export class RegistroPacientesComponent implements OnInit {
  soloTexto = /^[a-zA-Z\s]*$/;
  soloNumeros = /^\d+$/;

  formRegistro = this.formBuilder.group({
    Nombre: ['',[Validators.required,Validators.pattern(this.soloTexto)]],
    Apellidos: ['',[Validators.required,Validators.pattern(this.soloTexto)]],
    Genero:['',[Validators.required]],
    Edad: ['',[Validators.required, Validators.pattern(this.soloNumeros)]],
    Nivel_S:['',[Validators.required]],
    Poblacion:['',[Validators.required]],
    Enfermedades: ['', [Validators.required]],
    Tipo_E:['',[Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private _pacientesService: PacientesService) { }

  ngOnInit(): void {
  }

  isValidField(field: string){
    switch(field){
      case 'Genero':
      case 'Tipo_E':
      case 'Poblacion':
      case 'Nivel_S':
      case 'Enfermedades':
        if((this.formRegistro.get(field)?.touched && this.formRegistro.get(field)?.value == 'nada') || (this.formRegistro.get(field)?.touched && this.formRegistro.get(field)?.invalid)){
          return true;
        }
        else{
          return false;
        }
      default: return (this.formRegistro.get(field)?.touched && this.formRegistro.get(field)?.invalid);
    }
  }

  clearForm(){
    this.formRegistro.reset();
  }

  async sendData(){
    let data = this.formRegistro.getRawValue();
    data.Nombre = data.Nombre?.trim();
    data.Apellidos = data.Apellidos?.trim();
    data.Enfermedades = data.Enfermedades?.trim();
    console.log(data);
    
    try {
      let respuesta = await this._pacientesService.create(data).toPromise();
      console.log(respuesta);
      this.formRegistro.reset();
    } catch (error) {
      console.log(error.err);
    }

  }

}
