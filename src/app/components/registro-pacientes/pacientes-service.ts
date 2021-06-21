import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PacientesService {
    endpoint: string = "http://localhost:3000" + "/paciente";

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<any> {
        return this.httpClient.get(this.endpoint) as Observable<any>;
    }

    create(newPaciente: any): Observable<any> {
        return this.httpClient.post(this.endpoint, newPaciente) as Observable<any>;
    }

    delete(pacienteID: number): Observable<any> {
        return this.httpClient.delete(this.endpoint + `/${pacienteID}`) as Observable<any>;
    }

    update(pacienteID: number, modifiedPaciente: any): Observable<any> {
        return this.httpClient.put(this.endpoint + `/${pacienteID}`, modifiedPaciente) as Observable<any>;
    }
}
