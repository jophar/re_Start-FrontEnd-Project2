import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from '../shared/json.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  loginValidation! : FormGroup;
  registerForm! : FormGroup;

  userIsLogged: boolean;

  maleSubMenu : string[] = ["Casacos", "Camisas", "Calças", "Sweatshirts", "Polos", "Sapatos", "T-Shirts", "Todos"];
  womanSubMenu : string[] = ["Vestidos", "Blusões", "Coletes", "Jeans", "Saias", "Calções", "Lingerie", "Sapatos", "Malas", "Todos"];
  kinderSubMenu : string[] = ["Menina | 6-14 Anos", "Menino | 6-14 Anos", "Bebé Menina | 3 Meses - 5 Anos", "Bebé Menino | 3 Meses - 5 Anos", "Mini | 0-12 Meses"];
  accessoriesSubMenu : string [] = ["Malas", "Pulseiras", "Aneis"];

  closeResult = '';

  constructor(private modalService: NgbModal, private serverConnect: JsonService) { 

    this.userIsLogged = false;

  }

  ngOnInit(): void {

    this.loginValidation = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });

    this.registerForm = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl(''),
      morada: new FormControl(''),
      codigoPostal: new FormControl(''),
      pais: new FormControl(''),
      active: new FormControl(false),
      admin: new FormControl(false)
    });

  }

  // Retirado da documentação do Bootstrap 5 para Angular

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  registerUser() {
      this.serverConnect.insertUserToDatabase(this.registerForm.value).subscribe(registoInserido => {
        console.log(registoInserido);
        console.log("ESTOU AQUI!");
    });
  }

}
