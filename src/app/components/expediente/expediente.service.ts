import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExpedientesService {
    endpoint: string = "http://localhost:3000" + "/expediente";

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<any> {
        return this.httpClient.get(this.endpoint) as Observable<any>;
    }

    getByID(pacienteID: number): Observable<any> {
        return this.httpClient.get(this.endpoint + `/${pacienteID}`) as Observable<any>;
    }

    create(newExpediente: any): Observable<any> {
        return this.httpClient.post(this.endpoint, newExpediente) as Observable<any>;
    }

    delete(consultaID: number): Observable<any> {
        return this.httpClient.delete(this.endpoint + `/${consultaID}`) as Observable<any>;
    }

    update(modifiedExpediente: any): Observable<any> {
        return this.httpClient.put(this.endpoint, modifiedExpediente) as Observable<any>;
    }

}