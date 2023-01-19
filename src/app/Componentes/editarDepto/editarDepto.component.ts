import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Departamento } from 'src/app/models/Departamento';
import { DepartamentoService } from 'src/app/departamento.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editarDepto',
  templateUrl: './editarDepto.component.html',
  styleUrls: ['./editarDepto.component.css']
})
export class EditarDeptoComponent implements OnInit {

  public modalRef: BsModalRef;
  public deptoForm: FormGroup;
  public titulo = 'Departamentos';
  public deptoSelecionado: Departamento;

  public modo = 'put';

  public deptos: Departamento [];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private departamentoService: DepartamentoService) {
                this.criarForm();
               }

  ngOnInit() {
    this.carregarDeptos();
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
    //(departamento.id != 0) ? this.modo = 'put' : this.modo = 'post';

    this.departamentoService[this.modo](departamento).subscribe({
      next: (retorno: Departamento[]) => {
          console.log(retorno);
          this.carregarDeptos();        
        },
        error: (error: any) => { } 
      });
  }

  deletarDepto(id: number) {
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

  deptoSubmit() {
    console.log(this.deptoForm.value);
    this.salvarDepto(this.deptoForm.value);
    this.carregarDeptos(); 
  }

  deptoSelect(departamento: Departamento){
    this.deptoSelecionado = departamento;
    this.deptoForm.patchValue(departamento);
  }

  deptoNovo(){
    this.deptoSelecionado = new Departamento();
    this.deptoForm.patchValue(this.deptoSelecionado);
  }

  voltar() {
    this.deptoSelecionado = null;
  }

}
