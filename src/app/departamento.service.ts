import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departamento } from '../app/models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  baseUrl = `${environment.UrlPrincipal}/api/Departamento`;

constructor(private http: HttpClient) { }

getAll(): Observable<Departamento[]> {
  return this.http.get<Departamento[]>(`${this.baseUrl}`);
}

getById(id: number): Observable<Departamento> {
  return this.http.get<Departamento>(`${this.baseUrl}/${id}`);
}

post(departamento: Departamento) {
  return this.http.post(`${this.baseUrl}`, departamento);
}

put(id: number, departamento: Departamento) {
  return this.http.put(`${this.baseUrl}/${departamento.id}`, departamento);
}

delete(id: number) {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}