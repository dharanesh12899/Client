import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  submitted=false;
  match:number=0;
  chform!:FormGroup;
  nv:number=1;
  opcheck:number=0;
  un:any='';
  ph:any='';
  pass:any='';
  tot:number=0;
  pen:number=0;
  loading=true;
  propic:any='';
  proload=true;
  uppro=true;
  upproch:any='';
  file:any;
  nop=false;

  constructor(private _router: Router,private authService:AuthService,private fb:FormBuilder) {
    var usn:any = localStorage.getItem("username");
    usn = usn?.charAt(0).toUpperCase() + usn.slice(1);
    this.un = usn;
    this.ph=localStorage.getItem("phone");
    this.pass=localStorage.getItem("pass");
    
   }

  ngOnInit(): void {

    const storage = firebase.storage();
    const pathReference = storage.ref().child(this.ph+"/profile.jpg");
    pathReference.getDownloadURL().then((url)=>{
      this.proload=false;
      this.propic=url;
      
    }).catch((error)=>{
      console.log(error);
      this.nop=true;
    });

    this.ph=localStorage.getItem("phone");
    firebase.database().ref("/user/"+this.ph).once("value").then((snapshot)=>{
      this.pass=snapshot.val().password;
    });
    
    firebase.database().ref("/orderdata/"+this.ph).once("value").then((snapshot)=>{
      snapshot.forEach((child)=>{
        this.tot+=1;
        if(child.val().status!=="Deliverd"){
          this.pen=this.pen+1;
        }
          
      })
      this.loading=false;
      }).catch((error)=>{
      this.pen=0;
      this.loading=false;
      this.tot=0;
    });

    this.chform = this.fb.group({
      op:['',[Validators.required,Validators.minLength(8)]],
      cnp:['',[Validators.required,Validators.minLength(8)]],
      cnpa:['',[Validators.required,Validators.minLength(8)]],
    })
    }
  logo(){
    this.authService.logout();
    this._router.navigate([""]);
  }

  get f(){
    return this.chform.controls;
  }

  display(event:any){
    this.file=event;
    if (event.target.files && event.target.files[0]) {
      (<HTMLButtonElement>document.getElementById("upb")).disabled=false
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.upproch = event.target.result;
          this.uppro=false;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fn:any;

  uploadpro(){
    this.fn=this.file.target.files[0];
    var storage = firebase.storage().ref(this.ph+"/"+"profile.jpg");
    var task = storage.put(this.fn)
    task.on('state_changed',(snapshot)=>{
      (<HTMLButtonElement>document.getElementById("upb")).disabled=true;
      var p = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
      (<HTMLButtonElement>document.getElementById("upb")).innerHTML="Uploading..."+p+" %";
      if(p===100){
        (<HTMLButtonElement>document.getElementById("upb")).innerHTML="Done <i class='ri-check-line'></i> ";

      }
    })
  }

  repro(){
    this.proload=true;
    this.uppro=true;
    this.nop=true;
    (<HTMLButtonElement>document.getElementById("upb")).innerHTML="Upload";
    (<HTMLElement>document.getElementById("close")).setAttribute("data-dismiss","modal");
    const storage = firebase.storage();
    const pathReference = storage.ref().child(this.ph+"/profile.jpg");
    pathReference.getDownloadURL().then((url)=>{
      this.proload=false;
      this.propic=url;
      
    }).catch((error)=>{
      console.log(error);
    });
  }

  c1(){
    (<HTMLDivElement>document.getElementById("c1")).style.borderRight="5px solid gold";
    (<HTMLDivElement>document.getElementById("c2")).style.borderRight="none";
    (<HTMLDivElement>document.getElementById("c3")).style.borderRight="none";
    this.nv=1;
  }

  c2(){
    (<HTMLDivElement>document.getElementById("c2")).style.borderRight="5px solid gold";
    (<HTMLDivElement>document.getElementById("c1")).style.borderRight="none";
    (<HTMLDivElement>document.getElementById("c3")).style.borderRight="none";
    this.nv=2;
  }

  c3(){
    (<HTMLDivElement>document.getElementById("c3")).style.borderRight="5px solid gold";
    (<HTMLDivElement>document.getElementById("c1")).style.borderRight="none";
    (<HTMLDivElement>document.getElementById("c2")).style.borderRight="none";
    this.nv=3;
  }

  change(e:MouseEvent){
    e.preventDefault();
    this.submitted=true;
    if(this.chform.invalid){
      return;
    }
    else{

      if((<HTMLInputElement>document.getElementById("op")).value !== this.pass){
        this.opcheck=1;
      }
      else{
        this.opcheck=0;
      }
      if((<HTMLInputElement>document.getElementById("cnp")).value !== (<HTMLInputElement>document.getElementById("cnpa")).value){
        this.match=1;
      }
      else{
        this.match=0;
      }
      if(this.match===0 && this.opcheck===0) {
        this.opcheck=0;
        (<HTMLButtonElement>document.getElementById("valcon")).disabled=true;
        var np = (<HTMLInputElement>document.getElementById("cnpa")).value;
        firebase.database().ref("/user/"+this.ph).update({
          password:np
        })
        setTimeout(function(){
          (<HTMLDivElement>document.getElementById("succ")).style.display="none";
        },5000);
        (<HTMLDivElement>document.getElementById("succ")).style.display="block";
      }
    }
  }

  delacc(){
    alert("Account Deleted Successfully!!!");
    this.authService.logout();
    this._router.navigate([""]);
  }

}