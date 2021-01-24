import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Items} from 'src/app/interfaces/items';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  un:string = "Dharanesh";
  est:number=0;
  totpr:number=0;
  pr=[{'item':'Gravels','price':10000},{'item':'Sand','price':20000},{'item':'Cement','price':30000}];
  Items:Items[]=[];
  submitted=false;
  
  angform!: FormGroup;
  
  constructor(private _router: Router,private authService:AuthService,private fb:FormBuilder) {
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
    return (Math.floor((Math.random()) * 10000));
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
    var typesel=(<HTMLInputElement>document.getElementById("item")).value;
    var quant=parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    var addr=(<HTMLInputElement>document.getElementById("address")).value;
    var ar=(<HTMLInputElement>document.getElementById("area")).value;
    var dat=(<HTMLInputElement>document.getElementById("time")).value;
    var pri=this.est;
    this.Items.push({'id':id,'typeselected':typesel,'quantity':quant,'address':addr,'area':ar,'date':dat,'price':+pri});
    var tot=this.Items.reduce(function (p,c){return (p+c.price)},0);
    this.totpr=tot;
  }

  delete(id:number){
    this.Items.splice(this.Items.findIndex(a=> a.id ===id),1);
    var tot=this.Items.reduce(function (p,c){return (p+c.price)},0);
    this.totpr=tot;
  }

  makeOrder(){
    alert(this.Items.length);
  }
}