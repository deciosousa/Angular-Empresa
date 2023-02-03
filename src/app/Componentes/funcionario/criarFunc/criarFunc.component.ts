import { Component, OnInit, Input } from '@angular/core';
//importando o service, que contém os métodos de requisições Http
import { FuncionarioService } from 'src/app/funcionario.service';
import { DepartamentoService } from 'src/app/departamento.service';
// importe da classe necessária para gerar o roteamento a partir deste componente
import { Router } from '@angular/router';
//importando a model de Departamento
import { Departamento } from 'src/app/models/Departamento';


@Component({
  selector: 'app-criarFunc',
  templateUrl: './criarFunc.component.html',
  styleUrls: ['./criarFunc.component.css']
})
export class CriarFuncComponent implements OnInit {

  // criando uma propriedade (objeto literal) para ser o conjunto de dados que será transportado para o service e, de lá, persistido na base de dados.
  @Input() dadosRegistro = {
    id: 0,
    nomeFunc: '',
    dataContratacao: '',
    nomeDepto: '',
    deptoId: null
  }
  
  //criando as referências de instância do service (funcionarioService e departamentoService) e das classes de rotas (Router e ActivatedRoute).
  constructor(
    public funcionarioService: FuncionarioService,
    public departamentoService: DepartamentoService,
    public roteamento: Router
  ) { }
    
  //criando uma propriedade ('deptos') para ser a coleção iterável com a qual o componente vai interagir e consumir dados, por meio do select, para compor os valores atribuídos à propriedade 'nomeDepto' de cada registro (property binding).
  deptos: Departamento[];
  
  //Priorizando o carregamento dos registros de departamentos, que serão consumidos pelo form de criação do registro de funcionário.
  
  ngOnInit() {
    this.carregarDeptos();
   }
  
  carregarDeptos(){
    this.departamentoService.getAll().subscribe({
      next: (departamentos: Departamento[]) => {
          this.deptos = departamentos;
        },
        error: (error: any) => { } 
      });
  }

   // criando uma função para, por meio da injeção de dependência, enviar os dados capturados -  a partir da view - para o service
  cadastrarFunc(){

     //acessando o método post do service, para requisitar a criação de um registro. 
    this.funcionarioService.post(this.dadosRegistro).subscribe(() => {
      console.log(this.dadosRegistro);
       //informando ao usuário sobre o sucesso da alteração.
      window.alert('Funcionário cadastrado com sucesso!')
      //redirecionando o usuário para a view do componente de lista.
      this.roteamento.navigate(['/listarFunc'])
    })
  }
}
