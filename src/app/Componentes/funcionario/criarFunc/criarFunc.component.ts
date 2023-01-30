import { Component, OnInit, Input } from '@angular/core';
// importar o service
import { FuncionarioService } from 'src/app/funcionario.service';
import { DepartamentoService } from 'src/app/departamento.service';
// importar a classe Router
import { Router } from '@angular/router';

import { Departamento } from 'src/app/models/Departamento';

@Component({
  selector: 'app-criarFunc',
  templateUrl: './criarFunc.component.html',
  styleUrls: ['./criarFunc.component.css']
})
export class CriarFuncComponent implements OnInit {

  // primeira parte -  criar uma propriedade (objeto literal) para ser o conjunto de dados que será transportado para o service e, de lá, persistido na base de dados.
  @Input() dadosRegistro = {
    id: 0,
    nomeFunc: '',
    dataContratacao: '',
    nomeDepto: '',
    deptoId: null
  }

  public deptos: Departamento[];

  constructor(
    // segunda parte - fazer a referência de instância do service e da classe de rotas
    public funcionarioService: FuncionarioService,
    public departamentoService: DepartamentoService,
    public roteamento: Router
  ) { }

  ngOnInit() {
    this.carregarDeptos();
   }
  // terceira parte - criar uma função para enviar os dados capturados -  a partir da view - para o service

  carregarDeptos(){
    this.departamentoService.getAll().subscribe({
      next: (departamentos: Departamento[]) => {
          this.deptos = departamentos;
        },
        error: (error: any) => { } 
      });
  }

  cadastrarFunc(){
    // chamar a injeção de dependência para enviar os dados
    this.funcionarioService.post(this.dadosRegistro).subscribe(() => {
      this.roteamento.navigate(['/criarDepto'])
      window.alert('Funcionário cadastrado com sucesso!')
      this.roteamento.navigate(['/listarFunc'])
    })
  }
}
