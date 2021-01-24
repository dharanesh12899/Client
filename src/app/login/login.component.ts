import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router';
import {Login} from 'src/app/interfaces/login';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login ={userid:"7010756780",password:"dharanesh12899"}

  loginform!: FormGroup;
  submitted=false;
  constructor(private _router: Router,private authService:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!="false"){
      this._router.navigate(['book']);
    }
    this.loginform = this.fb.group({
      phone:['',Validators.required],
      pass:['',Validators.required],
    });
  }

  get f(){
    return this.loginform.controls;
  }

  log(e:MouseEvent){
    this.submitted=true;
    if(this.loginform.invalid)
      return;
    else if((<HTMLInputElement>document.getElementById("phone")).value==this.model.userid && (<HTMLInputElement>document.getElementById("pass")).value==this.model.password){
      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('token',(<HTMLInputElement>document.getElementById("phone")).value);
      this._router.navigate(['/book']);
    }
    else{
      setTimeout(function(){
        (<HTMLDivElement>document.getElementById("nope")).style.display="none";
      },5000);
      (<HTMLDivElement>document.getElementById("nope")).style.display="block";
    }
      
  }

}
