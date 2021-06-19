import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {

  correo : String = "";
  contra : String= "";
  aux : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  validacionLogin () : boolean{
    
    return this.aux;
  }

}
