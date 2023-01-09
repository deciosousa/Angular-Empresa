import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Departamento } from '../models/Departamento';

@Component({
  selector: 'app-departamentos', 
  templateUrl: './departamentos.component.html' , 
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  public modalRef: BsModalRef;
  public deptoForm: FormGroup;
  public titulo = 'Departamentos';
  public deptoSelecionado: Departamento;

  public deptos = [
    { id: 1, nome: 'Jurídico' },
    { id: 2, nome: 'Comercial' },
    { id: 3, nome: 'Auditoria' },
    { id: 4, nome: 'Recursos Humanos' },
    { id: 5, nome: 'T.I' },
    { id: 6, nome: 'Compliance' },
  ];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder,
              private modalService: BsModalService) { 
    this.criarForm();
  }

  ngOnInit() {
  }

  criarForm() {
    this.deptoForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  deptoSubmit() {
    console.log(this.deptoForm.value);
  }

  deptoSelect(departamento: Departamento){
    this.deptoSelecionado = departamento;
    this.deptoForm.patchValue(departamento);
  }

  voltar() {
    this.deptoSelecionado = null;
  }
}




