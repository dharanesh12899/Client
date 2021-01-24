import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if(this.isloggedIn()){
      return true;
    }
    this.router.navigate([""]);
    return false;
  }

  public isloggedIn(){
    let status = false;
    if(localStorage.getItem('isLoggedIn')=='true'){
      status=true;
    }
    else{
      status=false;
    }
    return status;
  }
}
