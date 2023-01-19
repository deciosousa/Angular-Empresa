import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarDeptoComponent } from './Componentes/criarDepto/criarDepto.component';
import { EditarDeptoComponent } from './Componentes/editarDepto/editarDepto.component';
import { ListarDeptoComponent } from './Componentes/listarDepto/listarDepto.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'criarDepto', component: CriarDeptoComponent},
  { path: 'editarDepto', component: EditarDeptoComponent},
  { path: 'listarDepto', component: ListarDeptoComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
