import { Component, OnInit } from '@angular/core';
//importando o service, que contém os métodos de requisições Http
import { FuncionarioService } from 'src/app/funcionario.service';
import { DepartamentoService } from 'src/app/departamento.service';
//importando as models, que contém as proriedades e tipos dos dados
import { Funcionario } from 'src/app/models/Funcionario';
import { Departamento } from 'src/app/models/Departamento';

// importes das classes necessárias para gerar o roteamento a partir deste componente e, ainda, ler o parâmetro (a variável da rota). Ex: editarFunc/:variavelId.
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-editarFunc',
  templateUrl: './editarFunc.component.html',
  styleUrls: ['./editarFunc.component.css']
})

//criando as referências de instância das classes funcionarioService, departamentoService, Router e ActivatedRoute

export class EditarFuncComponent implements OnInit {

  
  constructor(
    public funcionarioService: FuncionarioService,
    public departamentoService: DepartamentoService,
    public roteamento: Router,
    public route: ActivatedRoute
  ) { }
    
  //criando uma propriedade para ser uma "cópia (tirar uma foto)" da rota pela qual os dados circularão
  rotaCopiada = this.route.snapshot.params['id']
  
  //criando uma propriedade para receber os dados que serão atualizados.
  funcSelecionado: Funcionario;
  
  //criando uma propriedade ('deptos') para ser a coleção iterável com a qual o componente vai interagir e consumir dados, por meio do select, para compor os valores atribuídos à propriedade 'nomeDepto' de cada registro (property binding). 
  deptos: Departamento[];

  
  //Obs: A variável route criada na linha 27 possui a propriedade 'params' (linha 46). A params é que tem as propriedades que estão na rota. O subscribe recebe como parâmetro uma variável chamada 'parametros' do tipo 'Params'.
  
  //Priorizando o carregamento do registro escolhido para a atualização.
  ngOnInit() {
  
    //lendo a variável da rota 'variavelId', que neste caso, é o próprio valor do Id: editarFunc/1, editarFunc/3, editarFunc/5 etc.
    this.route.params.subscribe((parametros: Params): void => {
    
      console.log('parametros[variavelId]:' + parametros['variavelId']);
    
      // o valor que foi lido da rota, será passado para o método 'carregarFuncs', desse modo, this.carregarFuncs(1), this.carregarFuncs(3), this.carregarFuncs(5).  
      this.carregarFuncs(parametros['variavelId']);
  
      this.carregarDeptos();
    });
  }

    // criando uma função para exibir os dados de um registro específico contido na base de dados, conforme valores da variável 'idDoFunc', que é passada como parâmetro.
    
    //Obs: a variável idDoFunc, do tipo : number, recebe como valor, o id do funcionário que foi passado pela rota editarFunc/variavelId.
    carregarFuncs(idDoFunc: number) {
      //  ===== injeção de dependência para trazer os dados para o componente de edição ====

      //acessando o método getById do service, para requisitar os dados de um registro.
      this.funcionarioService.getById(idDoFunc).subscribe({
        // criando uma variável chamada 'funcionarios' do tipo 'Funcionario' para guardar os dados recebidos, bem como passando os valores dessa variável como parâmetro
        next: (funcionarios: Funcionario) => {
            //recebendo os valores na variável 'funcionarios' e atribuindo-os à variável 'funcSelecionado' que interage com a aplicação populando o 'form' com os dados do funcionário.
            this.funcSelecionado = funcionarios;
          },
          error: (error: any) => { } 
        });
    }

    carregarDeptos(){
      //  ===== injeção de dependência para trazer a lista de departamentos para o componente de edição ====
      this.departamentoService.getAll().subscribe({
        next: (departamentos: Departamento[]) => {
            this.deptos = departamentos;
          },
          error: (error: any) => { } 
        });
    }

     //criando uma função para acessar a Rest API e executar a tarefa assíncrona que atualizará a base de dados.
     
     // criando uma variável chamada 'funcionario' do tipo 'Funcionario' para passar como parâmetro da função salvarFunc. Obs: No service, o método put tem 2 parâmetros: id e o model.  
    salvarFunc(funcionario: Funcionario) {
      //acessando o método put do service, para requisitar a alteração dos dados em um registro específico. 
      this.funcionarioService.put(this.funcSelecionado).subscribe({
        next: (retorno: Funcionario) => {
            console.log(retorno);
            //informando ao usuário sobre o sucesso da alteração.
            window.alert('Alteração realizada com sucesso!')
            //redirecionando o usuário para a view do componente de lista.
            this.roteamento.navigate(['/listarFunc'])       
          },
          error: (error: any) => { } 
        });
    }

}
