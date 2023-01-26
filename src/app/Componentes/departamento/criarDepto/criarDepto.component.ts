// import { Component, OnInit, TemplateRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Departamento } from 'src/app/models/Departamento';
// import { DepartamentoService } from 'src/app/departamento.service';


// import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// @Component({
//   selector: 'app-criarDepto',
//   templateUrl: './criarDepto.component.html',
//   styleUrls: ['./criarDepto.component.css']
// })
// export class CriarDeptoComponent implements OnInit {

//   //public modalRef: BsModalRef;
//   public deptoForm: FormGroup;
//   public titulo = 'Departamentos';
//   public deptoSelecionado: Departamento;

//   public modo = 'post';

//   public depto: Departamento;

//   public deptos: Departamento [];


//   constructor(private fb: FormBuilder,
//               private departamentoService: DepartamentoService) { 
//     this.criarForm();
//   }

//   ngOnInit() {
//     //this.criarForm();
//   }


//   criarForm() {
//     this.deptoForm = this.fb.group({
//       id: [''],
//       nome: ['', Validators.required]
//     });
//   }

//   carregarDeptos() {
//     this.departamentoService.getAll().subscribe({
//       next: (departamentos: Departamento[]) => {
//           this.deptos = departamentos;
//         },
//         error: (error: any) => { } 
//       });
//   }

//   salvarDepto(departamento: Departamento): void {

//     this.departamentoService.post(departamento).subscribe({
//       next: (retorno: Departamento) => {
//           console.log(retorno);
//           this.carregarDeptos();        
//         },
//         error: (error: any) => { } 
//       });
//   }

//   deptoSubmit() {
//     console.log(this.deptoForm.value);
//     this.salvarDepto(this.deptoForm.value);
//     this.carregarDeptos(); 
//   }

//   deptoNovo(){
//     this.deptoSelecionado = new Departamento();
//     this.deptoForm.patchValue(this.deptoSelecionado);
//   }
// }

import { Component, OnInit, Input } from '@angular/core';
// importar o service
import { DepartamentoService } from 'src/app/departamento.service';
// importar a classe Router
import { Router } from '@angular/router';


@Component({
  selector: 'app-criarDepto',
  templateUrl: './criarDepto.component.html',
  styleUrls: ['./criarDepto.component.css']
})
export class CriarDeptoComponent implements OnInit {

  // primeira parte -  criar uma propriedade (objeto literal) para ser o conjunto de dados que será transportado para o service e, de lá, persistido na base de dados.
  @Input() dadosRegistro = {
    id: 0,
    nome: ''
    // email: '',
    // phone: ''
  }

  constructor(
    // segunda parte - praticar a referência de instância do service e da classe de rotas
    public departamentoService: DepartamentoService,
    public roteamento: Router
  ) { }

  ngOnInit() {
  }
  // terceira parte - criação de uma função para enviar os dados capturados -  a partir da view - para o service
  inserirColaborador(){
    // chamar a injeção de dependência para enviar os dados
    this.departamentoService.post(this.dadosRegistro).subscribe(() => {
      this.roteamento.navigate(['/criarDepto'])
    })
  }
}