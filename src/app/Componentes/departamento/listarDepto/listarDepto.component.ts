import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
//importando o service, que contém os métodos de requisições Http
import { DepartamentoService } from 'src/app/departamento.service';
import { FuncionarioService } from 'src/app/funcionario.service';
//importando as models, que contêm as proriedades e tipos dos dados
import { Departamento } from 'src/app/models/Departamento';
import { Funcionario } from 'src/app/models/Funcionario';
//importando classes que permitem o uso da modal.
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//importando classes que auxiliam no uso da pipe 'arrayFiltroFunc'
import { debounceTime, fromEvent } from 'rxjs';


@Component({
  selector: 'app-listarDepto',
  templateUrl: './listarDepto.component.html',
  styleUrls: ['./listarDepto.component.css']
})
export class ListarDeptoComponent implements OnInit {

  //criando uma propriedade ('deptos e funcs') para serem a coleções iteráveis com as quais o componente vai interagir e consumir dados, por meio de property binding
  public deptos: Departamento [];
  public funcs: Funcionario [] = [];

  public modalRef: BsModalRef;
  
  //inicializando a propriedade filtro e a definindo como string vazio, para evitar que o filter  seja passado para o 'arrayFiltro.pipe' como undefined.
  public filtro = '';
  
  // decorator da consulta inserida no input '#campoBusca'
  @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;


  // recebendo como parâmetros: o template e o departamentoSelecionado(do tipo string). A variável departamentoSelecionado recebe o valor originado no *ngFor depto.nome) 

  openModal(template: TemplateRef<any>, departamentoSelecionado: string) {
    //lendo o departamento selecionado no console
    console.log(departamentoSelecionado);
    // o departamento selecionado é o filtro, passado como parâmetro, para carregar apenas os funcionários que pertencem ao departamento 
    this.carregarFuncs(departamentoSelecionado);
    this.modalRef = this.modalService.show(template);
  }

  //praticando a referência de instância do service 
  constructor(private departamentoService: DepartamentoService,
              private funcionarioService: FuncionarioService,
              //praticando a referência de instância da classe BsModalservice
              private modalService: BsModalService) { }

  ngOnInit() {
    //priorizando a chamada e carregamento, na view do componente listarDepto, da lista de departamentos contida na base de dados. 
    this.carregarDeptos();
  }

  //criando a função que exibe todos os registros contidos na base de dados.
  carregarDeptos() {
     //  ===== injeção de dependência para trazer os dados para o componente de lista ====

    //acessando o método getAll do service, para requisitar todos os dados dos departamentos 
    this.departamentoService.getAll().subscribe({
      // criando uma variável chamada 'departamentos' do tipo 'Departamento' para guardar os dados recebidos, bem como passando os valores dessa variável como parâmetro
      next: (departamentos: Departamento[]) => {
           //recebendo os valores recebidos na variável 'departamentos' e atribuindo-os à variável 'deptos' que interage com a aplicação populando a tabela com os dados dos departamentos.
          this.deptos = departamentos;
        },
        error: (error: any) => { } 
      });
  }

  // criada o parâmetro departamentoSelecionado para que seja o filtro do método carregarFuncs e, assim, trazer apenas os funcionários do departamento selecionado.
  carregarFuncs(departamentoSelecionado: string) {
    // limpando a lista, após a execução do método.
    // se isso não for feito, a lista será acumulada com os funcionários das consultas anteriores. Para ver o erro, basta comentar a linha abaixo.
    this.funcs = [];
    //acessando o método getAll do service, para requisitar todos os dados dos funcionários 
    this.funcionarioService.getAll().subscribe({
      // retornando todos os funcionários na variável 'funcionarios'
      next: (funcionarios: Funcionario[]) => {     
          // percorrendo a lista de funcionarios retornada item(func) a item .
        for (var func of funcionarios) {
          // comparando o nome do depto do funcionario para que seja adicionado na variável this.funcs 
          if(func.nomeDepto == departamentoSelecionado) {
          // adicionando o objeto funcionario na this.funcs que é do tipo lista/array: Funcionario[]
            this.funcs.push(func);
          } 
        }
      },
      error: (error: any) => { } 
      });
  }

  //criando uma função para excluir um registro e definindo que ela terá um parâmetro do tipo Id, para identificar e individualizar o registro que deve ser excluído. 
  deletarDepto(id: number) {

    // inserindo uma condição para a exclusão do registro, neste caso, a confirmação pelo usuário. 
    if(window.confirm('Confirma a exclusão do registro?'))
    // chamando a injeção de dependência para executar a tarefa de exclusão do registro e passando o Id do registro que deve ser excluído.
    this.departamentoService.delete(id).subscribe({
      next: (model: any) => {
          console.log(model);
          // carregar a lista atualizada de registros, após a exclusão.
          this.carregarDeptos();        
        },
        error: (error: any) => { 
          console.log(error);
        } 
    });
  }

  //método usado para ativar o fluxo de filtragem. O debounceTime evita processamento desnecessário, pois, a filtragem só inicia depois de digitado um termo mais concreto.
  ngAfterViewInit() {
    fromEvent(this.campoBusca.nativeElement, 'keyup')
      .pipe(debounceTime(400))
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.filtro = target.value;
      });
  }

}
