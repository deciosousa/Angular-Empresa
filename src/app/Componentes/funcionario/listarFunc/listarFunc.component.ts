import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/funcionario.service';

@Component({
  selector: 'app-listarFunc',
  templateUrl: './listarFunc.component.html',
  styleUrls: ['./listarFunc.component.css']
})
export class ListarFuncComponent implements OnInit {

  public funcs: Funcionario [];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit() {
    this.carregarFuncs();
  }

  carregarFuncs() {
    this.funcionarioService.getAll().subscribe({
      next: (funcionarios: Funcionario[]) => {
          this.funcs = funcionarios;
        },
        error: (error: any) => { } 
      });
  }

  deletarFunc(id: number) {

    if(window.confirm('Confirma a exclusão do registro?'))
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
}
