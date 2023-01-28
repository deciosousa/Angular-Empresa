import { Component, OnInit, Input } from '@angular/core';
// importar o service
import { FuncionarioService } from 'src/app/funcionario.service';
// importar a classe Router
import { Router } from '@angular/router';

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

  constructor(
    // segunda parte - fazer a referência de instância do service e da classe de rotas
    public funcionarioService: FuncionarioService,
    public roteamento: Router
  ) { }

  ngOnInit() { }
  // terceira parte - criar uma função para enviar os dados capturados -  a partir da view - para o service

  cadastrarFunc(){
    // chamar a injeção de dependência para enviar os dados
    this.funcionarioService.post(this.dadosRegistro).subscribe(() => {
      this.roteamento.navigate(['/criarDepto'])
      window.alert('Funcionário cadastrado com sucesso!')
      this.roteamento.navigate(['/listarFunc'])
    })
  }
}
