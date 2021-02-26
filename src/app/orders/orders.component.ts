import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ordersInter} from 'src/app/interfaces/ordersinter';
import * as firebase from 'firebase';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  un:any='';
  loading=true;
  or:ordersInter[]=[];
  maxdate:any;
  dates:any=[];
  ph:any;
  delid:any;

  constructor(private _router: Router,private authService:AuthService) {
    var usn:any = localStorage.getItem("username");
    usn = usn?.charAt(0).toUpperCase() + usn.slice(1);
    this.un = usn;
   }

  ngOnInit(): void {
    this.ph=localStorage.getItem("phone");
    this.nofilter();
    /*
    this.or.push({id:123456789,order:'12 Jan 2021',item:'Gravels',status:"Approved",price:10000,quantity:3,address:'3, Rve Nagar, 3rd Street',area:'Maniyakaramplayam',date:'31 Jan 2021'});
    this.or.push({id:123456710,order:'12 Jan 2021',item:'Gravels',status:"Processing",price:10000,quantity:3,address:'3, Rve Nagar, 3rd Street',area:'Maniyakaramplayam',date:'31 Jan 2021'});
    this.or.push({id:123456711,order:'12 Jan 2021',item:'Gravels',status:"Delivered",price:10000,quantity:3,address:'3, Rve Nagar, 3rd Street',area:'Maniyakaramplayam',date:'31 Jan 2021'});
  */}
  
  nofilter(){
    this.loading=true;
    this.or=[];
    firebase.database().ref("/orderdata/"+this.ph).once('value').then((snapshot)=>{
      snapshot.forEach((child)=>{
        if(child.val().status!=="Cancelled")
          this.or.push({id:child.val().orderid,order:child.val().orderdate,item:child.val().item,status:child.val().status,price:child.val().price,quantity:child.val().quantity,address:child.val().address,area:child.val().area,date:child.val().deliverydate})
      })      
      this.or.sort((a, b) => (new Date(a.order) < new Date(b.order) ? 1 : -1));
      this.loading=false;
    })
  }

  statusfilter(status:string){
    this.loading=true;
    this.or=[];
    firebase.database().ref("/orderdata/"+this.ph).once('value').then((snapshot)=>{
      snapshot.forEach((child)=>{
        if(child.val().status===status)
          this.or.push({id:child.val().orderid,order:child.val().orderdate,item:child.val().item,status:child.val().status,price:child.val().price,quantity:child.val().quantity,address:child.val().address,area:child.val().area,date:child.val().deliverydate})
      })      
      this.or.sort((a, b) => (new Date(a.order) < new Date(b.order) ? 1 : -1));
      this.loading=false;
    })
  }

  itemfilter(item:string){
    this.loading=true;
    this.or=[];
    firebase.database().ref("/orderdata/"+this.ph).once('value').then((snapshot)=>{
      snapshot.forEach((child)=>{
        if(child.val().item===item)
          this.or.push({id:child.val().orderid,order:child.val().orderdate,item:child.val().item,status:child.val().status,price:child.val().price,quantity:child.val().quantity,address:child.val().address,area:child.val().area,date:child.val().deliverydate})
      })      
      this.or.sort((a, b) => (new Date(a.order) < new Date(b.order) ? 1 : -1));
      this.loading=false;
    })
  }

  cancel(id:number){
    this.delid=id;
    (<HTMLDivElement>document.getElementById("summary")).style.visibility="visible";
  }

  noact(){
    (<HTMLDivElement>document.getElementById("summary")).style.visibility="hidden";
  }
  cancelorder(){
    firebase.database().ref("/orderdata/"+ this.ph +"/"+this.delid).update({
      status:"Cancelled"
    });
    (<HTMLDivElement>document.getElementById("summary")).style.visibility="hidden";
    location.reload();
  }

  logo(){
    this.authService.logout();
    this._router.navigate([""]);
  }
}