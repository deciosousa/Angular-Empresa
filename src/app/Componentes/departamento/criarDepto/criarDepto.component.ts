import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Departamento } from 'src/app/models/Departamento';
import { DepartamentoService } from 'src/app/departamento.service';


import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-criarDepto',
  templateUrl: './criarDepto.component.html',
  styleUrls: ['./criarDepto.component.css']
})
export class CriarDeptoComponent implements OnInit {

  //public modalRef: BsModalRef;
  public deptoForm: FormGroup;
  public titulo = 'Departamentos';
  public deptoSelecionado: Departamento;

  public modo = 'post';

  public depto: Departamento;

  public deptos: Departamento [];


  constructor(private fb: FormBuilder,
              private departamentoService: DepartamentoService) { 
    this.criarForm();
  }

  ngOnInit() {
    //this.criarForm();
  }


  criarForm() {
    this.deptoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required]
    });
  }

  carregarDeptos() {
    this.departamentoService.getAll().subscribe({
      next: (departamentos: Departamento[]) => {
          this.deptos = departamentos;
        },
        error: (error: any) => { } 
      });
  }

  salvarDepto(departamento: Departamento): void {

    this.departamentoService.post(departamento).subscribe({
      next: (retorno: Departamento) => {
          console.log(retorno);
          this.carregarDeptos();        
        },
        error: (error: any) => { } 
      });
  }

  deptoSubmit() {
    console.log(this.deptoForm.value);
    this.salvarDepto(this.deptoForm.value);
    this.carregarDeptos(); 
  }

  deptoNovo(){
    this.deptoSelecionado = new Departamento();
    this.deptoForm.patchValue(this.deptoSelecionado);
  }
}
