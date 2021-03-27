import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Items} from 'src/app/interfaces/items';
import {prods} from 'src/app/interfaces/products'
import * as firebase from 'firebase';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  un:any;

  constructor(private _router: Router,private authService:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
    var usn:any = localStorage.getItem("username");
    usn = usn?.charAt(0).toUpperCase() + usn.slice(1);
    this.un = usn;
  }

  logo(){
    this.authService.logout();
    this._router.navigate([""]);
  } 
}
