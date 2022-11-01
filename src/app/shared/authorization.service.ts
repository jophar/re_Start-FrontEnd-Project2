import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { Product } from './product';
import { User } from './user';

@Injectable({ providedIn: 'root', })

export class AuthorizationService {

    isUserLoggedIn : boolean = false;
    
    constructor() {

    }

    isAutenticaded() {
        return this.isUserLoggedIn;
    }

    athenticate() {
        this.isUserLoggedIn = true;
    }

    logout() {
        this.isUserLoggedIn = false;
    }
}