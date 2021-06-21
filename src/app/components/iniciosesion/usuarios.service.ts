import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
    endpoint: string = "http://localhost:3000" + "/usuario";

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<any> {
        return this.httpClient.get(this.endpoint) as Observable<any>;
    }

    getByID(usuarioID: number): Observable<any> {
        return this.httpClient.get(this.endpoint + `/${usuarioID}`) as Observable<any>;
    }

    create(newUsuario: any): Observable<any> {
        return this.httpClient.post(this.endpoint, newUsuario) as Observable<any>;
    }

    delete(usuarioID: number): Observable<any> {
        console.log("Usuario con ID: "+usuarioID+" eliminado");
        return this.httpClient.delete(this.endpoint + `/${usuarioID}`) as Observable<any>;
    }

    update(usuarioID: number, modifiedUsuario: any): Observable<any> {
        return this.httpClient.put(this.endpoint + `/${usuarioID}`, modifiedUsuario) as Observable<any>;
    }
}
