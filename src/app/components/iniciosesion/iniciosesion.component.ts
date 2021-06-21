import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import { SesionesService } from 'src/app/sesiones.service';
import { UsuariosService } from 'src/app/components/iniciosesion/usuarios.service'; 



@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {
  correo : string = "";
  contra : string = "";
  correoEstatico: string = "didi@gmail.com";
  contraEstatica: string = "didiDIDI";
  soloTexto = /^[a-zA-Z\s]*$/; //j
  soloNumeros = /^\d+$/;
  correosReg : any = [];
  contraReg : any = [];

  formRegistro = this.formBuilder.group({
    Nombre: ['',[Validators.required,Validators.pattern(this.soloTexto)]],
    Apellidos: ['',[Validators.required,Validators.pattern(this.soloTexto)]],
    Correo:['',[Validators.required]],
    Contrasena: ['',[Validators.required]],
    Telefono:['',[Validators.required,Validators.pattern(this.soloNumeros)]],
    Tipo:['',[Validators.required,Validators.pattern(this.soloNumeros)]],
    Disponibilidad: ['', [Validators.required,Validators.pattern(this.soloNumeros)]],
  });


  constructor(private router: Router, private _sesionesService: SesionesService, private formBuilder: FormBuilder, private metodosUsuario : UsuariosService) { }

  async validacionLogin(){
    this.correosReg = await this.metodosUsuario.getAll().toPromise();
    this.correosReg = this.correosReg.array;
    //UNO
    for(let i=0; i< this.correosReg.lenght; i++ ){
     // for(let j=0; j<8; j++){
        if(this.correosReg[i]['Correo'] == this.correo){
          if(this.correosReg[i]['Contrasena'] == this.contra){
            let usuario = {
              nombre: this.contraReg[i]['Nombre'],
              correo: this.correo
            }
            this._sesionesService.iniciarSesion(usuario);
            this.router.navigateByUrl('/expedientes');
            console.log(this.contraReg[i]);
          }else{
            this.router.navigateByUrl('/iniciosesion');
          }
        }else{
          this.router.navigateByUrl('/iniciosesion');
        }
     // }
    }
    //DOS
    this.correosReg.forEach((correoTemp: any) => {
      
      if(correoTemp['Correo'] == this.correo){
        if(correoTemp['Contrasena'] == this.contra){
          let usuario = {
            nombre: correoTemp['Nombre'],
            correo: this.correo
          }
          this._sesionesService.iniciarSesion(usuario);
          this.router.navigateByUrl('/expedientes');
          console.log(correoTemp);
        }else{
          this.router.navigateByUrl('/iniciosesion');
        }
      }else{
        this.router.navigateByUrl('/iniciosesion');
      }
      
    }); 

  }

  ngOnInit(): void {
    if(this._sesionesService.sesionIniciada()){
      this.router.navigateByUrl('/expedientes');
    }
  }

  isValidField(field: string){
    switch(field){
      case 'Nombre':
      case 'Apellidos':
      case 'Correo':
      case 'Contrasena':
      case 'Tipo':
      case 'Telefono':
      case 'Disponibilidad':
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
    data.Correo = data.Correo?.trim();
    data.Contrasena = data.Contrasena?.trim();
    data.Telefono = data.Telefono?.trim();
    data.Tipo = data.Tipo?.trim();
    data.Disponibilidad = data.Disponibilidad?.trim();
    console.log(data);
    
    try {
      let respuesta = await this.metodosUsuario.create(data).toPromise();
      console.log(respuesta);
      //sendMail();
      this.formRegistro.reset();
    } catch (error) {
      console.log(error.err);
    }

  }

}
