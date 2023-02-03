import { Departamento } from "./Departamento";

// definir as propriedades e os respectivos tipos, dos dados que circulam pela aplicação
export class Funcionario {

  id: number;
  nomeFunc: string;
  dataContratacao: string;
  nomeDepto: string;
  deptoId: Departamento
}
