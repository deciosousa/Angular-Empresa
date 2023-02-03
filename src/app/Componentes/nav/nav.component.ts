import { Component, OnInit } from '@angular/core';

// criação do componente de barra de navegação, que conterá os routerLinks de acesso demais componentes, responsáveis pelo CRUD.  
@Component({
  
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
