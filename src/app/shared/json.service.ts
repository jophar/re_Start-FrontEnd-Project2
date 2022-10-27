import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { Product } from './product';
import { User } from './user';

@Injectable({ providedIn: 'root', })

  export class JsonService {
  
    private urlApiUsers = "http://localhost:3000/users";
    private urlApiProducts = "http://localhost:3000/produtos";
  
    constructor(private http : HttpClient) { }
  
    private processaErro(erro : HttpErrorResponse) {
      console.log(erro.status);
      let mensagem = "";
      if (erro.status===404) {
        mensagem = "Página inexistente";
      } else {
        mensagem = "Ocorreu um erro";
      }
      
      const err = new Error(mensagem);
      return throwError( () => err)
    }
  
    getProducts() {
      return this.http.get<Product[]>(this.urlApiProducts, { observe : 'response' });
    }

    getOneProduct(id : number) {
      return this.http.get<Product>(`${this.urlApiProducts}/${id}`);
    }

    getHighlights() {
      return this.http.get<Product[]>(`${this.urlApiProducts}?destaque_like=true`, { observe: 'response' });
    }

    getProductsByType(type : string) {
      return this.http.get<Product[]>(`${this.urlApiProducts}?tipo_de_produto=${type}`, { observe: 'response' });
    }

    getUsers() {
      return this.http.get<User[]>(`${this.urlApiUsers}`, { observe : 'response' });
    }
  }
  

