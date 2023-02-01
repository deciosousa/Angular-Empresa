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
  public funcs: Funcionario [];
  public modalRef: BsModalRef;
  public filtro = '';

  @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private departamentoService: DepartamentoService,
              private funcionarioService: FuncionarioService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.carregarDeptos();
    this.carregarFuncs();
  }

  carregarDeptos() {
    this.departamentoService.getAll().subscribe({
      next: (departamentos: Departamento[]) => {
          this.deptos = departamentos;
        },
        error: (error: any) => { } 
      });
  }

  carregarFuncs() {
    this.funcionarioService.getAll().subscribe({
      next: (funcionarios: Funcionario[]) => {
          this.funcs = funcionarios;
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
