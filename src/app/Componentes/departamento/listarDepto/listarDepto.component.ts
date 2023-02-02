import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { Departamento } from 'src/app/models/Departamento';
import { Funcionario } from 'src/app/models/Funcionario';
import { DepartamentoService } from 'src/app/departamento.service';
import { FuncionarioService } from 'src/app/funcionario.service';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime, fromEvent } from 'rxjs';


@Component({
  selector: 'app-listarDepto',
  templateUrl: './listarDepto.component.html',
  styleUrls: ['./listarDepto.component.css']
})
export class ListarDeptoComponent implements OnInit {

  public deptos: Departamento [];
  public funcs: Funcionario [] = [];
  public modalRef: BsModalRef;
  public filtro = '';
  

  @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;


  // recebendo o template e o departamento selecionado, do tipo string
  openModal(template: TemplateRef<any>, departamentoSelecionado: string) {
    //lendo o departamento selecionado no console
    console.log(departamentoSelecionado);
    // o departamento selecionado é o filtro, passado como parâmetro, para carregar apenas os funcionários que pertencem ao departamento 
    this.carregarFuncs(departamentoSelecionado);
    this.modalRef = this.modalService.show(template);
  }

  constructor(private departamentoService: DepartamentoService,
              private funcionarioService: FuncionarioService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.carregarDeptos();
  }

  carregarDeptos() {
    this.departamentoService.getAll().subscribe({
      next: (departamentos: Departamento[]) => {
          this.deptos = departamentos;
        },
        error: (error: any) => { } 
      });
  }

  // criada o parâmetro departamentoSelecionado para que seja o filtro do método carregarFuncs e, assim, trazer apenas os funcionários do depto selecionado.
  carregarFuncs(departamentoSelecionado: string) {
    // se não limpar a lista, sempre que o método for executado, a lista será acumulada com os funcionários das consultas anteriores. Para ver o erro, basta comentar a linha abaixo.
    this.funcs = [];
    //lendo todos os funcionários
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

  deletarDepto(id: number) {

    if(window.confirm('Confirma a exclusão do registro?'))
    this.departamentoService.delete(id).subscribe({
      next: (model: any) => {
          console.log(model);
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
