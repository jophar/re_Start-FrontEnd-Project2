import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu: boolean;

  maleSubMenu : string[] = ["Casacos", "Camisas", "Calças", "Sweatshirts", "Polos", "Sapatos", "Todos"];
  womanSubMenu : string[] = ["Vestidos", "Blusões", "Coletes", "Jeans", "Saias", "Calções", "Lingerie", "Sapatos", "Malas", "Todos"];
  kinderSubMenu : string[] = ["Menina | 6-14 Anos", "Menino | 6-14 Anos", "Bebé Menina | 3 Meses - 5 Anos", "Bebé Menino | 3 Meses - 5 Anos", "Mini | 0-12 Meses"];
  accessoriesSubMenu : string [] = ["Malas", "Pulseiras", "Aneis"];

  constructor() { 

    this.showMenu = false;

  }

  ngOnInit(): void {
    
  }
}
