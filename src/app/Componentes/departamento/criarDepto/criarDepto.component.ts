import { Component, OnInit, Input } from '@angular/core';
//importando o service, que contém os métodos de requisições Http
import { DepartamentoService } from 'src/app/departamento.service';
// importe da classe necessária para gerar o roteamento a partir deste componente
import { Router } from '@angular/router';

@Component({
  selector: 'app-criarDepto',
  templateUrl: './criarDepto.component.html',
  styleUrls: ['./criarDepto.component.css']
})
export class CriarDeptoComponent implements OnInit {

  // criando uma propriedade (objeto literal) para ser o conjunto de dados que será transportado para o service e, de lá, persistido na base de dados.
  @Input() dadosRegistro = {
    id: 0,
    nome: ''
  }

   //criando as referências de instância do departamentoService e da classe de rotas 'Router'.
  constructor(
    public departamentoService: DepartamentoService,
    public roteamento: Router
  ) { }

  ngOnInit() { }

  // criando uma função para, por meio da injeção de dependência, enviar os dados capturados -  a partir da view - para o service
  cadastrarDepto(){
  
    //acessando o método post do service, para requisitar a criação de um registro. 
    this.departamentoService.post(this.dadosRegistro).subscribe(() => {
      //informando ao usuário sobre o sucesso da alteração.
      window.alert('Departamento cadastrado com sucesso!')
      //redirecionando o usuário para a view do componente de lista.
      this.roteamento.navigate(['/listarDepto'])
    })
  }
}


