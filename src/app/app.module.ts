import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarDeptoComponent } from './Componentes/departamento/criarDepto/criarDepto.component';
import { EditarDeptoComponent } from './Componentes/departamento/editarDepto/editarDepto.component';
import { ListarDeptoComponent } from './Componentes/departamento/listarDepto/listarDepto.component';
import { CriarFuncComponent } from './Componentes/funcionario/criarFunc/criarFunc.component';
import { EditarFuncComponent } from './Componentes/funcionario/editarFunc/editarFunc.component';
import { ListarFuncComponent } from './Componentes/funcionario/listarFunc/listarFunc.component';
import { NavComponent } from './Componentes/nav/nav.component';
import { TituloComponent } from './Componentes/titulo/titulo.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [					
    AppComponent,
    CriarDeptoComponent,
    EditarDeptoComponent,
    ListarDeptoComponent,
    CriarFuncComponent,
    EditarFuncComponent,
    ListarFuncComponent,
    NavComponent,
    TituloComponent
   ],
   
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
