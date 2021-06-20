import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SesionesService {
  constructor() { }

  iniciarSesion(usuario: any){
    localStorage.setItem('logueado', 'true');
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cerrarSesion(){
    localStorage.setItem('logueado', 'false');
    localStorage.removeItem('usuario');
  }

  sesionIniciada(): boolean {
    let logueado = localStorage.getItem('logueado')=='true';
    return logueado;
  }

  obtenerUsuario(){
    let usuarioString = String(localStorage.getItem('usuario'));
    let usuario = JSON.parse(usuarioString);
    return usuario;
  }

}
