import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators, FormControl, AbstractControl} from '@angular/forms';
import {Router} from'@angular/router';


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
        this.match=0;
        (<HTMLDivElement>document.getElementById("nope")).style.display="block";
    }
  }
}

}