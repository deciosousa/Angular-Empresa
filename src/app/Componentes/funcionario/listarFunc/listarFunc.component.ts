import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
//importando o service, que contém os métodos de requisições Http
import { FuncionarioService } from 'src/app/funcionario.service';
//importando a model, que contém as proriedades e tipos dos dados
import { Funcionario } from 'src/app/models/Funcionario';
//imports que auxiliam no uso da pipe 'arrayFiltroFunc'
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-listarFunc',
  templateUrl: './listarFunc.component.html',
  styleUrls: ['./listarFunc.component.css']
})
export class ListarFuncComponent implements OnInit {

  //criando uma propriedade ('funcs') para ser a coleção iterável com a qual o componente vai interagir e consumir dados por meio de property binding
  public funcs: Funcionario [] = [];

  //inicializando a propriedade filter e a definindo como string vazio, para evitar que o filter  seja passado para o 'arrayFiltroFunc.pipe' como undefined.
  public filter = '';

  // decorator da consulta inserida no input '#campoBusca'
  @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;

  //praticando a referência de instância do service e estabelecendo a injeção de dependência
  constructor(public funcionarioService: FuncionarioService) { }

  ngOnInit() {
    //priorizando a chamada e carregamento, na view do componente listarFunc, da lista de funcionários contida na base de dados. 
    this.carregarFuncs();
  }
  //criando a função que exibe todos os registros contidos na base de dados.
  carregarFuncs() {
    //  ===== injeção de dependência para trazer os dados para o componente de lista ====

    //acessando o método getAll do service, para requisitar todos os dados dos funcionários 
    this.funcionarioService.getAll().subscribe({
      // criando uma variável chamada 'funcionarios' do tipo 'Funcionario' para guardar os dados recebidos, bem como passando os valores dessa variável como parâmetro
      next: (funcionarios: Funcionario[]) => {
        //recebendo os valores recebidos na variável 'funcionarios' e atribuindo-os à variável 'funcs' que interage com a aplicação populando a tabela com os dados dos funcionários.
          this.funcs = funcionarios;
        },
        error: (error: any) => { } 
      });
  }
  //criando uma função para excluir um registro e definindo que ela terá um parâmetro do tipo Id, para identificar e individualizar o registro que deve ser excluído. 
  deletarFunc(id: number) {

    // inserindo uma condição para a exclusão do registro, neste caso, a confirmação pelo usuário. 
    if(window.confirm('Confirma a exclusão do registro?'))
    // chamando a injeção de dependência para executar a tarefa de exclusão do registro e passando o Id do registro que deve ser excluído.
    this.funcionarioService.delete(id).subscribe({
      next: (model: any) => {
          console.log(model);
          // carregar a lista atualizada de registros, após a exclusão.
          this.carregarFuncs();        
        },
        error: (error: any) => { 
          console.log(error);  
        } 
    });
  }

     //método usado para ativar o fluxo de filtragem antes do envio à pipe. O debounceTime evita processamento desnecessário, pois, a filtragem só inicia depois de digitado um termo mais concreto.
     ngAfterViewInit() {
      fromEvent(this.campoBusca.nativeElement, 'keyup')
        .pipe(debounceTime(400))
        .subscribe((e: Event) => {
          const target = e.target as HTMLInputElement;
          this.filter = target.value;
        });
    }
}
