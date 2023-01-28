import { Component, OnInit, Input } from '@angular/core';
// importar o service
import { DepartamentoService } from 'src/app/departamento.service';
// importar a classe Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-criarDepto',
  templateUrl: './criarDepto.component.html',
  styleUrls: ['./criarDepto.component.css']
})
export class CriarDeptoComponent implements OnInit {

  // primeira parte -  criar uma propriedade (objeto literal) para ser o conjunto de dados que será transportado para o service e, de lá, persistido na base de dados.
  @Input() dadosRegistro = {
    id: 0,
    nome: ''
  }

  constructor(
    // segunda parte - fazer a referência de instância do service e da classe de rotas
    public departamentoService: DepartamentoService,
    public roteamento: Router
  ) { }

  ngOnInit() { }
  // terceira parte - criar uma função para enviar os dados capturados -  a partir da view - para o service
  cadastrarDepto(){
    // chamar a injeção de dependência para enviar os dados
    this.departamentoService.post(this.dadosRegistro).subscribe(() => {
      this.roteamento.navigate(['/criarDepto'])
      window.alert('Departamento cadastrado com sucesso!')
      this.roteamento.navigate(['/listarDepto'])
    })
  }
}


