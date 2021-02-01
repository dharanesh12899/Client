import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators, FormControl, AbstractControl} from '@angular/forms';
import {Router} from'@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform!: FormGroup;
  submitted=false;
  
  match:number=0;

  constructor(private _router: Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!="false"){
      this._router.navigate(['book']);
      return;
    }
    this.registerform = this.fb.group({
      reguser:['',Validators.required],
      regmob:['',[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
      regpass:['',[Validators.required,Validators.minLength(8)]],
      conregpass:['',[Validators.required,Validators.minLength(8)]],
  })
}
  

  get f(){
    return this.registerform.controls;
  }

  togglep(){
    (<HTMLElement>document.getElementById("ptog")).classList.toggle("ri-eye-off-fill")
    if((<HTMLInputElement>document.getElementById("regpass")).type=="password"){
      (<HTMLInputElement>document.getElementById("regpass")).setAttribute("type","text");
    }
    else{
    (<HTMLInputElement>document.getElementById("regpass")).setAttribute("type","password");
    }
  }
  togglecp(){
    (<HTMLElement>document.getElementById("cptog")).classList.toggle("ri-eye-off-fill")
    if((<HTMLInputElement>document.getElementById("conregpass")).type=="password"){
      (<HTMLInputElement>document.getElementById("conregpass")).setAttribute("type","text");
    }
    else{
    (<HTMLInputElement>document.getElementById("conregpass")).setAttribute("type","password");
    }
  }

  reg(e:MouseEvent){
    this.submitted=true;
    this.match=0;
    if(this.registerform.invalid){
      return;
    }
    else{  
      if((<HTMLInputElement>document.getElementById("regpass")).value !== (<HTMLInputElement>document.getElementById("conregpass")).value){
        this.match=1;
      }
      else {
        (<HTMLButtonElement>document.getElementById("rgb")).disabled=true;
        (<HTMLButtonElement>document.getElementById("rgb")).innerHTML="Registering your account  <i class='fa fa-spinner fa-pulse'></i>"
        var user=(<HTMLInputElement>document.getElementById("reguser")).value;
        var pho=parseInt((<HTMLInputElement>document.getElementById("regmob")).value);
        console.log(pho);
        var pass=(<HTMLInputElement>document.getElementById("regpass")).value;

        this.match=0;
        firebase.database().ref("user/"+pho).set({
          username:user,
          phone:pho,
          password:pass
        });

        (<HTMLButtonElement>document.getElementById("rgb")).innerHTML="Account Registered!!!";
        (<HTMLDivElement>document.getElementById("succ")).style.display="block";
    }
  }
}

}