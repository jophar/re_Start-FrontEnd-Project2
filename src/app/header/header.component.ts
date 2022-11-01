import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalService } from '../local-strorage.service';
import { AuthorizationService } from '../shared/authorization.service';
import { JsonService } from '../shared/json.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  loginForm!: FormGroup;
  registerForm!: FormGroup;

  isUserLoggedIn!: boolean;
  loggedUserName: string = "";
  maleSubMenu: string[] = ["Casacos", "Camisas", "Calças", "Sweatshirts", "Polos", "Sapatos", "T-Shirts", "Todos"];
  womanSubMenu: string[] = ["Vestidos", "Blusões", "Coletes", "Jeans", "Saias", "Calções", "Lingerie", "Sapatos", "Malas", "Todos"];
  kinderSubMenu: string[] = ["Menina | 6-14 Anos", "Menino | 6-14 Anos", "Bebé Menina | 3 Meses - 5 Anos", "Bebé Menino | 3 Meses - 5 Anos", "Mini | 0-12 Meses"];
  accessoriesSubMenu: string[] = ["Malas", "Pulseiras", "Aneis"];

  registerSuccess!: boolean;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private serverConnect: JsonService,
    private localStore: LocalService,
    private auth: AuthorizationService) {
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', { initialValueIsDefault: true, validators: [Validators.required] }),
      senha: new FormControl('', { validators: [Validators.required] })
    });

    this.registerForm = new FormGroup({
      nome: new FormControl('', { initialValueIsDefault: true, validators: [Validators.required] }),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      senha: new FormControl('', { validators: [Validators.required] }),
      morada: new FormControl('', { validators: [Validators.required] }),
      codigoPostal: new FormControl('', { validators: [Validators.required] }),
      pais: new FormControl('', { validators: [Validators.required] }),
      active: new FormControl(false),
      admin: new FormControl(false)
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      senha: new FormControl('')
    })

    this.isUserLoggedIn = this.auth.isAutenticaded();
  }

  // Retirado da documentação do Bootstrap 5 para Angular

  open(content: any) {
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
    this.serverConnect.insertUserToDatabase(this.registerForm.value).subscribe(async registoInserido => {
      let dataReturn = registoInserido;
      if (dataReturn.status === 201) {
        this.registerSuccess = true;
      }
    });
  }

  checkLogin() {
    let email: string = this.loginForm.value.email;
    let pass: string = this.loginForm.value.senha;

    this.serverConnect.getUsers().subscribe({
      next: users => {
        let user = users.body!.filter(u => u.email === email);

        if (user[0].senha === pass) {

          if (user[0].admin) {
            this.localStore.saveData(user[0].email, "admin");
            this.auth.athenticate();
            this.loggedUserName = user[0].nome;
            this.isUserLoggedIn = this.auth.isAutenticaded();
            this.router.navigateByUrl('/admin');
          } else {
            this.localStore.saveData(user[0].email, "user");
            this.auth.athenticate();
            this.loggedUserName = user[0].nome;
            this.isUserLoggedIn = this.auth.isAutenticaded();
          }
        }
      }
    });
  }

  logout() {
    this.auth.logout();
    this.isUserLoggedIn = this.auth.isAutenticaded();
    this.router.navigateByUrl('');
  }
}
