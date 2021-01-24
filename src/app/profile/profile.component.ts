import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  un:string="Dharanesh";
  constructor(private _router: Router,private authService:AuthService) { }

  ngOnInit(): void {
  }
  
  book(){
    this._router.navigate(["book"]);
  }

  orders(){
    alert("!");
    this._router.navigate(["orders"]);
  }

  logo(){
    this.authService.logout();
    this._router.navigate([""]);
  }
}
