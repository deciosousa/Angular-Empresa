import { Component, OnInit} from '@angular/core';

import { Departamento } from 'src/app/models/Departamento';
import { DepartamentoService } from 'src/app/departamento.service';

@Component({
  selector: 'app-listarDepto',
  templateUrl: './listarDepto.component.html',
  styleUrls: ['./listarDepto.component.css']
})
export class ListarDeptoComponent implements OnInit {

  public titulo = 'Departamentos';

  public deptos: Departamento [];

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit() {
    this.carregarDeptos();
  }

  carregarDeptos() {
    this.departamentoService.getAll().subscribe({
      next: (departamentos: Departamento[]) => {
          this.deptos = departamentos;
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
}