import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/Departamento';
import { DepartamentoService } from 'src/app/departamento.service';

// importes das classes necessárias para ler a variável da rota. Ex: editarDepto/1, editarDepto/3, editarDepto/5, etc.
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editarDepto',
  templateUrl: './editarDepto.component.html',
  styleUrls: ['./editarDepto.component.css']
})
export class EditarDeptoComponent implements OnInit {

  constructor(private departamentoService: DepartamentoService,
              public roteamento: Router,
              // Criação da instância da classe ActivatedRoute, por meio da variável route.
              private route: ActivatedRoute) { }
  
  rotaCopiada = this.route.snapshot.params['id']
  
  deptoSelecionado: Departamento;

  ngOnInit() {

      //A variável route criada na linha 18 possui a propriedade 'params', conforme a linha 29. A params é que tem as propriedades que estão na rota, editarDepto/1, editarDepto/3, editarDepto/5, etc. Para acessar essas variáveis da rota é preciso executar o subscribe da 'params'. O subscribe também possui o tipo 'Params' que foi definido na variável 'parametros'.

      this.route.params.subscribe((parametros: Params): void => {
        //Na linha acima, da variável 'parametros' do tipo 'Params', é lida a variável da rota 'variavelId', que neste caso, é o próprio valor do Id: editarDepto/1, editarDepto/3, editarDepto/5 etc, que no caso é o 1, 3, 5 etc.
        // Lembrando que para ver esse valor no browser, deve-se abrir o devTools/aba console.
      console.log('parametros[variavelId]:' + parametros['variavelId']);
      // o valor que foi lido da rota, será passado para o método 'carregarDeptos', desse modo, this.carregarDeptos(1), this.carregarDeptos(3), this.carregarDeptos(5).  
      this.carregarDeptos(parametros['variavelId']);
    });
  }

  // Adicionado aqui a variável idDoDepto do tipo 'number' para receber o id do departamento que foi passado pela rota editarDepto/1, editarDepto/3, editarDepto/5
  carregarDeptos(idDoDepto: number) {
    this.departamentoService.getById(idDoDepto).subscribe({
      next: (departamentos: Departamento) => {
          this.deptoSelecionado = departamentos;
        },
        error: (error: any) => { } 
      });
  }

  salvarDepto(departamento: Departamento) {

    this.departamentoService.put(this.rotaCopiada, this.deptoSelecionado).subscribe({
      next: (retorno: Departamento) => {
          console.log(retorno);
          window.alert('Alteração realizada com sucesso!')
          this.roteamento.navigate(['/listarDepto'])       
        },
        error: (error: any) => { } 
      });
  }
}

