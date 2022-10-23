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
      // erro.message
      const err = new Error(mensagem);
      return throwError( () => err)
    }
  
    getProducts() {

      return this.http.get<Product[]>(this.urlApiProducts, { observe : 'response' })
        .pipe(
          // tap(registos => {
          //   console.log(registos);
          // }),
          // catchError(err => of([])) // never[]
          catchError(this.processaErro)
        );
    }

    getHighlights() {
        return this.http.get<Product[]>(`${this.urlApiProducts}?$destaque_like=true`);
    }

    getUsers() {

        return this.http.get<User[]>(`${this.urlApiUsers}`, { observe : 'response' })
          .pipe(
            // tap(registos => {
            //   console.log(registos);
            // }),
            // catchError(err => of([])) // never[]
            catchError(this.processaErro)
          );
      }
  }
  

