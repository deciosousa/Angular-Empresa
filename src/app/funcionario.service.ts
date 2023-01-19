import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../app/models/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl = `${environment.UrlPrincipal}/api/Funcionario`;

constructor(private http: HttpClient) { }

getAll(): Observable<Funcionario[]> {
  return this.http.get<Funcionario[]>(`${this.baseUrl}`);
}

getById(id: number): Observable<Funcionario> {
  return this.http.get<Funcionario>(`${this.baseUrl}/${id}`);
}

post(funcionario: Funcionario) {
  return this.http.post(`${this.baseUrl}`, funcionario);
}

put(funcionario: Funcionario) {
  return this.http.put(`${this.baseUrl}/${funcionario.id}`, funcionario);
}

delete(id: number) {
  return this.http.delete(`${this.baseUrl}/${id}`);
}
}
