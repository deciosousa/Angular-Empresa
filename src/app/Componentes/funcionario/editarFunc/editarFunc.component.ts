import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/funcionario.service';
import { DepartamentoService } from 'src/app/departamento.service';
import { Departamento } from 'src/app/models/Departamento';

// importes das classes necessárias para ler a variável da rota. Ex: editarFunc/1, editarFunc/3, editarFunc/5, etc.
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editarFunc',
  templateUrl: './editarFunc.component.html',
  styleUrls: ['./editarFunc.component.css']
})

export class EditarFuncComponent implements OnInit {

  public deptos: Departamento[];

  constructor(private funcionarioService: FuncionarioService,
              public departamentoService: DepartamentoService,
              public roteamento: Router,
              // Criação da instância da classe ActivatedRoute, por meio da variável route.
              private route: ActivatedRoute) { }
  
  rotaCopiada = this.route.snapshot.params['id']
  
  funcSelecionado: Funcionario;

  ngOnInit() {
    
    // this.routeSub = this.route.params.subscribe((params: Params): void => {
      //A variável route criada na linha 30 possui a propriedade 'params'. A params é que tem as propriedades que estão na rota. Para acessar essas variáveis da rota é preciso executar o subscribe da 'params'. O subscribe também possui o tipo 'Params' que foi definido na variável 'parametros'.
    
      this.route.params.subscribe((parametros: Params): void => {
        //Na linha acima, da variável 'parametros' do tipo 'Params', é lida a variável da rota 'variavelId', que neste caso, é o próprio valor do Id: editarFunc/1, editarFunc/3, editarFunc/5 etc, que no caso é o 1, 3, 5 etc.
        // Lembrando que para ver esse valor no browser, deve-se abrir o devTools/aba console.
      console.log('parametros[variavelId]:' + parametros['variavelId']);
      // o valor que foi lido da rota, será passado para o método 'carregarFuncs', desse modo, this.carregarFuncs(1), this.carregarFuncs(3), this.carregarFuncs(5).  
      this.carregarFuncs(parametros['variavelId']);

      this.carregarDeptos();
    });
  }

    // Adicionado aqui a variável idDoFunc do tipo 'number' para receber o id do departamento que foi passado pela rota editarFunc/1, editarFunc/3, editarFunc/5
    carregarFuncs(idDoFunc: number) {
      this.funcionarioService.getById(idDoFunc).subscribe({
        next: (funcionarios: Funcionario) => {
            this.funcSelecionado = funcionarios;
          },
          error: (error: any) => { } 
        });
    }

    carregarDeptos(){
      this.departamentoService.getAll().subscribe({
        next: (departamentos: Departamento[]) => {
            this.deptos = departamentos;
          },
          error: (error: any) => { } 
        });
    }

    salvarFunc(funcionario: Funcionario) {

      this.funcionarioService.put(this.funcSelecionado).subscribe({
        next: (retorno: Funcionario) => {
            console.log(retorno);
            window.alert('Alteração realizada com sucesso!')
            this.roteamento.navigate(['/listarFunc'])       
          },
          error: (error: any) => { } 
        });
    }

}
