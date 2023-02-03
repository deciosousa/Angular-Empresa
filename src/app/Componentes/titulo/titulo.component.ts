import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  // criar uma propriedade (do tipo string) para ser vinculada na view de outros componentes
  @Input() titulo: string;

  constructor() { }

  ngOnInit() {
  }

}
