import { Component, OnInit } from '@angular/core';
//importando o service, que contém os métodos de requisições Http
import { DepartamentoService } from 'src/app/departamento.service';
//importando a model, que contém as proriedades e tipos dos dados
import { Departamento } from 'src/app/models/Departamento';

// importes das classes necessárias para gerar o roteamento a partir deste componente e, ainda, ler o parâmetro (a variável da rota). Ex: editarDepto/:variavelId.
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-editarDepto',
  templateUrl: './editarDepto.component.html',
  styleUrls: ['./editarDepto.component.css']
})
export class EditarDeptoComponent implements OnInit {

  constructor(
    public departamentoService: DepartamentoService,
    public roteamento: Router,
    public route: ActivatedRoute) { }
  
  //criando uma propriedade para ser uma "cópia (tirar uma foto)" da rota pela qual os dados circularão
  rotaCopiada = this.route.snapshot.params['id']
  
  //criando uma propriedade para receber os dados que serão atualizados.
  deptoSelecionado: Departamento;

    //Obs: A variável route criada na linha 20 possui a propriedade 'params' (linha 33). A params é que tem as propriedades que estão na rota. O subscribe recebe como parâmetro uma variável chamada 'parametros' do tipo 'Params'.
  
  //Priorizando o carregamento do registro escolhido para a atualização.
  ngOnInit() {

    //lendo a variável da rota 'variavelId', que neste caso, é o próprio valor do Id: editarDepto/1, editarDepto/3, editarDepto/5 etc.
    this.route.params.subscribe((parametros: Params): void => {

      console.log('parametros[variavelId]:' + parametros['variavelId']);

      // o valor que foi lido da rota, será passado para o método 'carregarDeptos', desse modo, this.carregarDeptos(1), this.carregarDeptos(3), this.carregarDeptos(5).  
      this.carregarDeptos(parametros['variavelId']);
    });
  }

  // criando uma função para exibir os dados de um registro específico contido na base de dados, conforme valores da variável 'idDoDepto', que é passada como parâmetro.

  //Obs: a variável idDoDepto, do tipo : number, recebe como valor, o id do funcionário que foi passado pela rota editarFunc/variavelId.
  carregarDeptos(idDoDepto: number) {
    //  ===== injeção de dependência para trazer os dados para o componente de edição ====

      //acessando o método getById do service, para requisitar os dados de um registro.
    this.departamentoService.getById(idDoDepto).subscribe({
      // criando uma variável chamada 'departamentos' do tipo 'Departamento' para guardar os dados recebidos, bem como passando os valores dessa variável como parâmetro
      next: (departamentos: Departamento) => {
          //recebendo os valores na variável 'departamentos' e atribuindo-os à variável 'deptoSelecionado' que interage com a aplicação populando o 'form' com os dados do departamento.
          this.deptoSelecionado = departamentos;
        },
        error: (error: any) => { } 
      });
  }

   //criando uma função para acessar a Rest API e executar a tarefa assíncrona que atualizará a base de dados.
     
  // criando uma variável chamada 'departamento' do tipo 'Departamento' para passar como parâmetro da função salvarDepto. Obs: No service, o método put tem 2 parâmetros: id e o model.  
  salvarDepto(departamento: Departamento) {
    //acessando o método put do service, para requisitar a alteração dos dados em um registro específico. 

    this.departamentoService.put(this.rotaCopiada, this.deptoSelecionado).subscribe({
      next: (retorno: Departamento) => {
          console.log(retorno);
          //informando ao usuário sobre o sucesso da alteração.
          window.alert('Alteração realizada com sucesso!')
          //redirecionando o usuário para a view do componente de lista.
          this.roteamento.navigate(['/listarDepto'])       
        },
        error: (error: any) => { } 
      });
  }
}

