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
      return this.http.get<Product[]>(`${this.urlApiProducts}`, { observe : 'response' });
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

    getOneUser(id: number) {
      return this.http.get<User>(`${this.urlApiUsers}/${id}`, { observe : 'response' });
    }

    getNonActiveUsers() {
      return this.http.get<User[]>(`${this.urlApiUsers}?active=false`, { observe : 'response' });
    }

    getProductsWithPages(type : string, beg : number, fin : number) {
      if(type === "Todos")
        return this.http.get<Product[]>(`${this.urlApiProducts}?_start=${beg}&_limit=${fin}&_sort=tipo_de_produto&_order=asc`, { observe : 'response' })
      .pipe(catchError(this.processaErro));
      else
        return this.http.get<Product[]>(`${this.urlApiProducts}?_start=${beg}&_limit=${fin}&_sort=tipo_de_produto&_order=asc&tipo_de_produto=${type}`, { observe : 'response' })
      .pipe(catchError(this.processaErro));
    }

    deleteProductFromDatabase(id : number) {
      return this.http.delete<Product>(`${this.urlApiProducts}/${id}`);
    }

    deleteUserFromDatabase(id: number) {
      return this.http.delete<User>(`${this.urlApiUsers}/${id}`);
    }

    authorizeUserInSite(id: number, u: User) {
      return this.http.put<User[]>(`${this.urlApiUsers}/${id}`, u, { observe : 'response' });
    }

    insertProductToDatabase(p : Product) {
      return this.http.post<Product>(this.urlApiProducts, p,  { observe : 'response' });
    }

    insertUserToDatabase(u : User) {
      return this.http.post<User>(this.urlApiUsers, u, { observe : 'response' });
    }

    searchProduct(search: string) {
      return this.http.get<Product[]>(`${this.urlApiProducts}?nome_like=${search}`, { observe : 'response' });
    }
  }
  

