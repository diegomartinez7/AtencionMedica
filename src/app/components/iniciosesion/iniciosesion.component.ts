import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SesionesService } from 'src/app/sesiones.service';

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

  constructor(private router: Router, private _sesionesService: SesionesService) { }

  ngOnInit(): void {
    if(this._sesionesService.sesionIniciada()){
      this.router.navigateByUrl('/expedientes');
    }
  }

  validacionLogin(){
    //LO QUE SIGUE ES SI EL USUARIO PASÓ EL LOG IN
    let usuario = {
      nombre: "Felipe Gómez",
      correo: this.correo,
      telefono: "9843534"
    }

    this._sesionesService.iniciarSesion(usuario);

    //Si todo está en orden y puede iniciar sesión, redirigimos hacia inicio
    this.router.navigateByUrl('/expedientes');
  }

}
