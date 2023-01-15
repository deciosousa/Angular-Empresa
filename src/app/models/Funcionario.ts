import { Departamento } from "./Departamento";

export class Funcionario {

  constructor() {
  this.id = 0;
  this.nomeFunc = '';
  this.dataContratacao = '';
  this.nomeDepto = '';   
  }
  id: number;
  nomeFunc: string;
  dataContratacao: string;
  nomeDepto: string;
  deptoId: Departamento
}
