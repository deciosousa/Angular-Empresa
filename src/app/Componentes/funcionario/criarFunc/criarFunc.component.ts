import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/funcionario.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-criarFunc',
  templateUrl: './criarFunc.component.html',
  styleUrls: ['./criarFunc.component.css']
})
export class CriarFuncComponent implements OnInit {

  public funcionarioForm: FormGroup;
  public titulo = 'Funcionários';
  public funcSelecionado: Funcionario;

  public modo = 'post';

  public func: Funcionario;

  public funcs: Funcionario [];


  constructor(private fb: FormBuilder, 
              private funcionarioService: FuncionarioService
              ) {
                this.criarForm();
              }

  ngOnInit() {
    //this.carregarFuncs();
  }

  criarForm() {
    this.funcionarioForm = this.fb.group({
      id: [''],
      nomeFunc: ['', Validators.required],
      dataContratacao: ['', Validators.required],
      nomeDepto: ['', Validators.required],
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

    this.funcionarioService[this.modo](funcionario).subscribe({ 
      next: (retorno: Funcionario[]) => {
          console.log(retorno);
          this.carregarFuncs();        
        },
        error: (error: any) => { } 
      });
  }

  funcSubmit() {
    console.log(this.funcionarioForm.value);
    this.salvarFunc(this.funcionarioForm.value);
    this.carregarFuncs();
  }


  funcNovo(){
    this.funcSelecionado = new Funcionario();
    this.funcionarioForm.patchValue(this.funcSelecionado);
  }
}
