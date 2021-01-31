import { Injectable } from '@angular/core';
import {Login} from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}
  
  logout(): void{
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('username');
    localStorage.removeItem('pass');
    localStorage.removeItem('phone');
  }
}