import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarDeptoComponent } from './Componentes/criarDepto/criarDepto.component';
import { EditarDeptoComponent } from './Componentes/editarDepto/editarDepto.component';
import { ListarDeptoComponent } from './Componentes/listarDepto/listarDepto.component';
import { NavComponent } from './Componentes/nav/nav.component';
import { TituloComponent } from './Componentes/titulo/titulo.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [					
    AppComponent,
    CriarDeptoComponent,
    EditarDeptoComponent,
    ListarDeptoComponent,
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
