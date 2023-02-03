import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFiltroFunc'
})
export class ArrayFiltroFuncPipe implements PipeTransform {


    transform(value: any[], term: string): any[] {
      return value.filter((x:any) => x.nomeFunc.toLowerCase().startsWith(term.toLowerCase()) || x.nomeDepto.toLowerCase().startsWith(term.toLowerCase()))
      
    } 
}
