import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-registro-pacientes',
  templateUrl: './registro-pacientes.component.html',
  styleUrls: ['./registro-pacientes.component.css']
})
export class RegistroPacientesComponent implements OnInit {

  //campos 

  soloTexto = /^[a-zA-Z\s]*$/;
  soloNumeros = /^\d+$/;

  sexo: string = '';

  formRegistro = this.formBuilder.group({
    newName: ['',[Validators.required,Validators.pattern(this.soloTexto)]],
    newEst: ['',[Validators.required, Validators.pattern(this.soloNumeros)]],
    newPeso: ['',[Validators.required, Validators.pattern(this.soloNumeros)]],
    newEdad: ['',[Validators.required, Validators.pattern(this.soloNumeros)]],
    newAlergias: [''],
    selectEdo:['',[Validators.required]],
    selectPob:['',[Validators.required]],
    selectIngreso:['',[Validators.required]],
    sx:['',[Validators.required]]

  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  isValidField(field: string){
    return(
      // this.formRegistro.get(field).touched && !this.formRegistro.get(field).valid
      this.formRegistro.get(field)?.touched && !this.formRegistro.get(field)?.valid
      
    );

  }
  sendData(){
    let data = {
      nombre: this.formRegistro.get('newName')?.value,
      estatura: this.formRegistro.get('newEst')?.value,
      peso: this.formRegistro.get('newPeso')?.value,
      edad: this.formRegistro.get('newEdad')?.value,
      sexo: this.formRegistro.get('sx')?.value,
      alergias: this.formRegistro.get('newAlergias')?.value,
      estado: this.formRegistro.get('selectEdo')?.value,
      poblacion: this.formRegistro.get('selectPob')?.value,
      clase: this.formRegistro.get('selectIngreso')?.value,
    };
    console.log('Data: ' + JSON.stringify(data));
    
    
  }

}
