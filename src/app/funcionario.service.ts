import { Injectable } from '@angular/core';
// importar os recursos necessários 
import { HttpClient } from '@angular/common/http'; 
import { Funcionario } from '../app/models/Funcionario';
import { environment } from 'src/environments/environment';
// importar recursos que auxiliarão a implementação de tarefas assíncronas
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  // definir o "caminho" necessário para que a base de dados seja acessada pela API. A URL da API foi chamada de 'UrlPrincipal' e está definida no arquivo environment.
  //baseUrl aponta para URL da api/funcionario, bastando acrescentar o parâmetro.
  baseUrl = `${environment.UrlPrincipal}/api/Funcionario`;

  // referência de instância da classe HttpClient - para auxiliar com os métodos/requisições implementados abaixo
constructor(private http: HttpClient) { }

  /*
    |||||||||| ======== MÉTODOS E TAREFAS ASSÍNCRONAS DA API ======= ||||||||||

  */

// método/requisição http para ler todos os dados que estão armazenados na base
  getAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseUrl}`);
  }
  // método/requisição para acessar somente um registro - da base - devidamente identificado
  getById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`);
  }
  // método usado para inserir um registro na base de dados
  post(funcionario: Funcionario) {
    return this.http.post(`${this.baseUrl}`, funcionario);
  }
  // método/requisição usado para atualização de um registro já existente/persistido na base de dados - 1 por vez.
  put(funcionario: Funcionario) {
    return this.http.put(`${this.baseUrl}/${funcionario.id}`, funcionario);
  }
  // método usado para excluir um registro existente base de dados.
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
