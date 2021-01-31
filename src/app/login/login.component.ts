import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  submitted=false;
  val:number=1;
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
    else{
        (<HTMLButtonElement>document.getElementById("lgb")).disabled=true;
        (<HTMLButtonElement>document.getElementById("lgb")).innerHTML="Logging you in  <i class='fa fa-spinner fa-pulse'></i>";
        var p = (<HTMLInputElement>document.getElementById("phone")).value;
        var pa = (<HTMLInputElement>document.getElementById("pass")).value;

        firebase.database().ref("/user/"+p).once("value").then((snapshot)=>{
          var phone = snapshot.val().phone;
          var pass = snapshot.val().password;
          var un =  snapshot.val().username;
        
          if(p.toString() === phone.toString() && pa.toString() === pass.toString()){
            localStorage.setItem('isLoggedIn','true');

            localStorage.setItem("username",un);
            localStorage.setItem("phone",phone);
            localStorage.setItem("pass",pass);

            this._router.navigate(['/book']);
          }

          else{
            setTimeout(function(){
              (<HTMLDivElement>document.getElementById("nope")).style.display="none";
            },5000);
            (<HTMLDivElement>document.getElementById("nope")).style.display="block";
            (<HTMLButtonElement>document.getElementById("lgb")).disabled=false;
            (<HTMLButtonElement>document.getElementById("lgb")).innerHTML="LOGIN"
          }   
        });     
      /*
      var db:any= firebase.database();
      var fuc:any=db.ref().child('user');
      
      console.log(fuc)*/
      /*if( s=firebase.firestore().collection("Users").where("phone","==",p).where("password","==",pa)));}*/
      
      /*
      firebase.auth().signInWithEmailAndPassword(p,pa).then((result)=>{
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('token',p);
        this._router.navigate(['/book']);
    })
      .catch((error)=>{
        setTimeout(function(){
          (<HTMLDivElement>document.getElementById("nope")).style.display="none";
        },5000);
        (<HTMLDivElement>document.getElementById("nope")).style.display="block";
      });*/
    }
  }
}