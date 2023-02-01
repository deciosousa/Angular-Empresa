import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/funcionario.service';

import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-listarFunc',
  templateUrl: './listarFunc.component.html',
  styleUrls: ['./listarFunc.component.css']
})
export class ListarFuncComponent implements OnInit {

  public funcs: Funcionario [];
  public filtro = '';

  @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;

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
