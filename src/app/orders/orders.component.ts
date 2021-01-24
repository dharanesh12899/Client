import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
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
