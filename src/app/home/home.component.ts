import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  un:string="";
  ph:any;
  constructor(private _router: Router,private authService:AuthService,private fb:FormBuilder) {
    var usn:any = localStorage.getItem("username");
    usn = usn?.charAt(0).toUpperCase() + usn.slice(1);
    this.un = usn;
    this.ph = localStorage.getItem("phone");
  }

  ngOnInit(): void {
    (<HTMLOutputElement>document.getElementById("feedbackop")).innerHTML = "50%";
  }

  logo(){
    this.authService.logout();
    this._router.navigate([""]);
  } 

  
  
  setBubble() {
    const allRanges = document.querySelectorAll(".range-wrap");
    var bubble = <HTMLOutputElement>document.getElementById("feedbackop");
    const val:any = (<HTMLInputElement>document.getElementById("feedper")).value;
    const min:any = (<HTMLInputElement>document.getElementById("feedper")).min ? (<HTMLInputElement>document.getElementById("feedper")).min : 0;
    const max:any = (<HTMLInputElement>document.getElementById("feedper")).max ? (<HTMLInputElement>document.getElementById("feedper")).max : 100;
    var newVal:number = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val+"%";
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  }

  feedform(){
    var d = new Date().toString();
    d = d.slice(0,24);
    var ff = (<HTMLInputElement>document.getElementById("feed")).value;
    var fp = (<HTMLInputElement>document.getElementById("feedper")).value;
    firebase.database().ref("feedback/"+this.ph).set({
      feedback:ff,
      percent:fp,
      time:d
    }).then(()=>{
      var x = <HTMLDivElement>document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    });

  }
}
