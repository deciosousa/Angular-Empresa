import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Funcionario } from '../models/Funcionario';

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

  public funcs = [
    { id: 1, nome: 'Alessandra', contratacao: '04/01/2023', areaDepto: 'Jurídico'},
    { id: 2, nome: 'Tina', contratacao: '04/01/2023', areaDepto: 'Comercial'},
    { id: 3, nome: 'Dani', contratacao: '04/01/2023', areaDepto: 'Auditoria'},
    { id: 4, nome: 'Fabi', contratacao: '04/01/2023', areaDepto: 'Recursos Humanos'},
    { id: 5, nome: 'Decio', contratacao: '04/01/2023', areaDepto: 'T.I'},
    { id: 6, nome: 'Tami', contratacao: '04/01/2023', areaDepto: 'Compliance'},
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
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      contratacao: ['', Validators.required],
      areaDepto: ['', Validators.required]
    });
  }

  funcSubmit() {
    console.log(this.funcionarioForm.value);
  }

  funcSelect(funcionario: Funcionario){
    this.funcSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }

  voltar() {
    this.funcSelecionado = null;
  }

}
