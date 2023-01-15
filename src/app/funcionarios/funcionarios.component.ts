import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Funcionario } from '../models/Funcionario';
import { FuncionarioService } from './funcionario.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  public modalRef: BsModalRef;
  public funcionarioForm: FormGroup;
  public titulo = 'Funcionários';
  public funcSelecionado: Funcionario;
  public modo = 'post';

  public funcs: Funcionario [];
    
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder, 
              private modalService: BsModalService,
              private funcionarioService: FuncionarioService
              ) {
    this.criarForm();
  }
  
  ngOnInit() {
    this.carregarFuncs();
  }

  criarForm() {
    this.funcionarioForm = this.fb.group({
      id: [''],
      nomeFunc: ['', Validators.required],
      dataContratacao: ['', Validators.required],
      nomeDepto: ['', Validators.required],
      deptoId: ['']
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

  salvarFunc(funcionario: Funcionario){
    (funcionario.id != 0) ? this.modo = 'put' : this.modo = 'post';

    this.funcionarioService[this.modo](funcionario).subscribe({ 
      next: (retorno: Funcionario[]) => {
          console.log(retorno);
          this.carregarFuncs();        
        },
        error: (error: any) => { } 
      });
  }

  deletarFunc(id: number) {
    this.funcionarioService.delete(id).subscribe({
      next: (model: any) => {
          console.log(model);
          this.carregarFuncs();        
        },
        error: (error: any) => { 
          console.log(error);
          
        } 
      });
  }

  funcSubmit() {
    console.log(this.funcionarioForm.value);
    this.salvarFunc(this.funcionarioForm.value);
    this.carregarFuncs();
  }

  funcSelect(funcionario: Funcionario){
    this.funcSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }

  funcNovo(){
    this.funcSelecionado = new Funcionario();
    this.funcionarioForm.patchValue(this.funcSelecionado);
  }

  voltar() {
    this.funcSelecionado = null;
  }
}
