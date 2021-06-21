import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {
    endpoint: string = "http://localhost:3000" + "/consulta";

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<any> {
        return this.httpClient.get(this.endpoint) as Observable<any>;
    }

    getByID(consultaID: number): Observable<any> {
        return this.httpClient.get(this.endpoint + `/${consultaID}`) as Observable<any>;
    }

    create(newConsulta: any): Observable<any> {
        return this.httpClient.post(this.endpoint, newConsulta) as Observable<any>;
    }

    delete(consultaID: number): Observable<any> {
        return this.httpClient.delete(this.endpoint + `/${consultaID}`) as Observable<any>;
    }

    update(consultaID: number, modifiedConsulta: any): Observable<any> {
        return this.httpClient.put(this.endpoint + `/${consultaID}`, modifiedConsulta) as Observable<any>;
    }

    sendRequest(pacienteID: number, consulta: any): Observable<any> {
        return this.httpClient.post(this.endpoint + `/${pacienteID}`, consulta) as Observable<any>;
    }
}
