import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Items} from 'src/app/interfaces/items';
import * as firebase from 'firebase';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  
  est:number=0;
  totpr:number=0;
  pr=[{'item':'Gravels','price':10000},{'item':'Sand','price':20000},{'item':'Cement','price':30000}];
  Items:Items[]=[];
  submitted=false;
  un:any;
  phone:any = localStorage.getItem("phone");
  angform!: FormGroup;
  

  constructor(private _router: Router,private authService:AuthService,private fb:FormBuilder) {
    var usn:any = localStorage.getItem("username");
    usn = usn?.charAt(0).toUpperCase() + usn.slice(1);
    this.un = usn;
  }

  
  ngOnInit(): void {
      this.angform = this.fb.group({
      itemsel:['',Validators.required],
      address:['',Validators.required],
      quantity:['',Validators.required],
      date:['',Validators.required],
      area:['',Validators.required],
    })
  }
  
  logo(){
    this.authService.logout();
    this._router.navigate([""]);
  } 
  
  get f(){
    return this.angform.controls;
  }

  private generateID(){
    var date:any=(new Date())
    var id = ((date.getDate()).toString()) + ((date.getMonth()).toString()) + ((date.getFullYear()).toString()) + ((date.getTime()).toString()); 
    return parseInt(id);
  }
  
  price(){
    var typesel=(<HTMLInputElement>document.getElementById("item")).value;
    if(typesel==="")
      this.est=0;
    else{
      var p=this.pr.findIndex(x => x.item === typesel);
      var quant=parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
      this.est= quant*this.pr[p].price;
      if(isNaN(this.est)){
        this.est=0;
      }
    }
  }

  add(e:MouseEvent){
    e.preventDefault();
    this.submitted=true;
    if(this.angform.invalid)
      return;
    var id=this.generateID();
    alert(id);
    var typesel=(<HTMLInputElement>document.getElementById("item")).value;
    var quant=parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    var addr=(<HTMLInputElement>document.getElementById("address")).value;
    var ar=(<HTMLInputElement>document.getElementById("area")).value;
    var dat:any=(<HTMLInputElement>document.getElementById("time")).value;
    dat = (new Date(dat)).toString();
    var ddate= dat.slice(4,15);
    var date=(new Date()).toString();
    date = date.slice(4,15);
    console.log(date);
    var pri=this.est;
    this.Items.push({'id':id,'typeselected':typesel,'quantity':quant,'address':addr,'area':ar,'orderdate':date,'deliverydate':ddate,'price':+pri});
    var tot=this.Items.reduce(function (p,c){return (p+c.price)},0);
    this.totpr=tot;
  }

  delete(id:number){
    this.Items.splice(this.Items.findIndex(a=> a.id ===id),1);
    var tot=this.Items.reduce(function (p,c){return (p+c.price)},0);
    this.totpr=tot;
  }

  makeOrder(){
    (<HTMLButtonElement>document.getElementById("place")).disabled=true;
    (<HTMLButtonElement>document.getElementById("place")).innerHTML="Placing your order!  <i class='fa fa-spinner fa-pulse'></i>";
    
    for(let i=0;i<this.Items.length;i++){
    firebase.database().ref("orderdata/"+this.phone+"/"+this.Items[i].id).set({
      address:this.Items[i].address,
      area:this.Items[i].area,
      deliverydate:this.Items[i].deliverydate,
      item:this.Items[i].typeselected,
      orderdate:this.Items[i].orderdate,
      orderid:this.Items[i].id,
      price:this.Items[i].price,
      quantity:this.Items[i].quantity,
      status:"Processing",
    });
    var x = <HTMLDivElement>document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    (<HTMLButtonElement>document.getElementById("place")).disabled=false;
    (<HTMLButtonElement>document.getElementById("place")).innerHTML="Place Order";
    this.Items =[];
  }
    
  }
}