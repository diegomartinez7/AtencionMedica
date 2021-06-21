import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SesionesService {
  constructor(private httpClient: HttpClient) { }

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

  obtenerSolicitudes(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/solicitud') as Observable<any>;
  }

  obtenersolicitud(index: number): Observable<any>{
    return this.httpClient.get(`http://localhost:3000/solicitud/${index}`) as Observable<any>;
  }

}
