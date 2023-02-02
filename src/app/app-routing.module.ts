import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarDeptoComponent } from './Componentes/departamento/criarDepto/criarDepto.component';
import { EditarDeptoComponent } from './Componentes/departamento/editarDepto/editarDepto.component';
import { ListarDeptoComponent } from './Componentes/departamento/listarDepto/listarDepto.component';
import { CriarFuncComponent } from './Componentes/funcionario/criarFunc/criarFunc.component';
import { EditarFuncComponent } from './Componentes/funcionario/editarFunc/editarFunc.component';
import { ListarFuncComponent } from './Componentes/funcionario/listarFunc/listarFunc.component';


//criar array e importar o 'Routes' do @angular/router
const routes: Routes = [

  //popular o array com as URL path e os respectivos componentes.
  
  //{ path: '', redirectTo: 'nav', pathMatch: 'full' },
  { path: 'criarDepto', component: CriarDeptoComponent},
  { path: 'editarDepto', component: EditarDeptoComponent},
  
  //publicada a rota editarDepto/1, editarDepto/3, editarDepto/5 etc para tornar conhecida + declaração da variável id. A variável id deve ser definida com :id
  { path: 'editarDepto/:variavelId', component: EditarDeptoComponent},
  { path: 'listarDepto', component: ListarDeptoComponent},
  { path: 'criarFunc', component: CriarFuncComponent },
  { path: 'editarFunc', component: EditarFuncComponent},
  { path: 'editarFunc/:variavelId', component: EditarFuncComponent},
  { path: 'listarFunc', component: ListarFuncComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [ ]
})
export class AppRoutingModule { }
