import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../HttpService';
import {User} from '../../user';
import {Point} from '../../Point';
import {SimplePoint} from '../../SimplePoint';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private canvas:HTMLCanvasElement;
  private context:CanvasRenderingContext2D;
  R:number=1;
  X:number;
  Y:number;
  user:User=this.httpService.getUser();
  point:Point = new Point();
  arr:string;
  arrPoints:SimplePoint[];


  constructor(private httpService:HttpService,private router:Router) {
    if(this.httpService.reg==false){
        this.router.navigate(['']);
       }
  }

  ngOnInit() {
    this.drawPicture();
    this.drawGraphWithR(1);
  }

  drawPicture(){
      // if(this.httpService.reg==false){
      //   this.router.navigate(['']);
      // }
   let canvas=document.getElementById('graph') as HTMLCanvasElement;
   let ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, 140);
    ctx.lineTo(280, 140);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(140, 0);
    ctx.lineTo(140, 280);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(140, 0);
    ctx.lineTo(136, 5);
    ctx.moveTo(140, 0);
    ctx.lineTo(144, 5);
    ctx.stroke();
    ctx.moveTo(280, 140);
    ctx.lineTo(275, 136);
    ctx.moveTo(280, 140);
    ctx.lineTo(275, 144);
    ctx.stroke();
    for (let i = 28; i <= 252; i += 28) {
      ctx.beginPath();
      ctx.moveTo(i, 140);
      ctx.lineTo(i, 144);
      ctx.lineTo(i, 136);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(140, i);
      ctx.lineTo(144, i);
      ctx.lineTo(136, i);
      ctx.stroke();
    }
    let countI:number = -4;
    for (let i = 28; i <= 252; i += 28) {
      if (i <= 112) {
        ctx.fillText(countI / 2 + 'R', i - 8, 155);
        ctx.fillText(-countI / 2 + 'R', 148, i + 4);
        countI++;
      } else if (i == 140) {
        ctx.fillText(String(countI), i + 5, 155);
        countI++;
      } else {
        ctx.fillText(countI / 2 + 'R', i - 8, 155);
        ctx.fillText(-countI / 2 + 'R', 148, i + 4);
        countI++;
      }
    }

  }
  drawGraphWithR(r) {
    console.log(r);
    if(this.validateR(r)) {
      let canvas = document.getElementById('graph') as HTMLCanvasElement;
      let ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      r = Number(r) * 28;
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.moveTo(140, 140);
      ctx.arc(140, 140, r, 0, -Math.PI / 2, true);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(140, 140);
      ctx.fillRect(140, 140, -r / 2, r);
      ctx.beginPath();
      ctx.lineTo(140 - r, 140);
      ctx.lineTo(140, 140 - r);
      ctx.lineTo(140, 140);
      ctx.fill();
      this.drawPicture();
      this.drawPoints();
    }
  }
  checkClick($event):any{
    console.log($event.offsetX+ "first" + $event.offsetY);
   this.point.x=($event.offsetX-140)/28;
   this.point.y=-($event.offsetY-140)/28;
   this.point.r = this.R;
   this.point.user=this.httpService.getUser();
   console.log(this.user);
   if(this.user==undefined){
     alert("Авторизация провалена! Вы будете возвращены на страницу авторизации!");
     this.httpService.reg=false;
     this.router.navigate(['']);

   }
   console.log("x = " + this.point.x +"; y =  " +  this.point.y+ "; r = "+ this.point.r);
   this.httpService.postDataPoints(this.point).subscribe(data=>this.parseData(data),error => console.log(error));
  }
  sendToServer(){
    this.point.x=this.X;
    this.point.y=this.Y;
    this.point.r=this.R;
    this.validateR(this.point.r);
    let check:boolean=true  ;
    this.point.user=this.httpService.getUser();
    if(this.user==undefined){
      alert("Авторизация провалена! Вы будете возвращены на страницу авторизации!");
      this.httpService.reg=false;
      this.router.navigate(['']);

    }
    if(check==true) {
      this.httpService.postDataPoints(this.point).subscribe(data => this.parseData(data), error => console.log(error));
    }
  }
  drawPoints(){
    let canvas=document.getElementById('graph') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    if(this.arr==undefined){
      return;
    }
    let rows=this.arr.length;
    console.log("Points : " + rows);
    for(let i =0;i<rows;i++){
      console.log(JSON.stringify(this.arr[i]));
      let Arrpoint:SimplePoint=<SimplePoint>JSON.parse(JSON.stringify(this.arr[i]));
      if(Arrpoint.r==this.R){
        if(Arrpoint.inArea==true){
            ctx.fillStyle='green';
        }else{
          ctx.fillStyle='red';
        }
      }else{
        ctx.fillStyle='grey';
      }
      this.paintArc(Arrpoint.x,Arrpoint.y);
    }

  }

  parseData (data:string){
  this.arr=data;
  this.arrPoints=[];
    // document.getElementById("table").innerHTML=" ";
  for(let i = 0;i<this.arr.length;i++){
    let Arrpoint:SimplePoint=<SimplePoint>JSON.parse(JSON.stringify(this.arr[i]));
    this.arrPoints.push(Arrpoint);
    // document.getElementById("table").innerHTML+="<tr><td>"+Arrpoint.x+"</td>" +
    //   "<td>"+Arrpoint.y+"</td><td>"+Arrpoint.r+"</td><td>"+Arrpoint.inArea+"</td></tr>";
  }
  console.log(this.arrPoints);
  this.drawPoints();
  }
  paintArc(x,y) {
    x=x*28+140;
    y=-y*28 +140;
    console.log(x + " second "+ y);
    let canvas=document.getElementById('graph') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

  }
  validateString(x:number):boolean{
    if(!/^(-?\d+)([.,]\d+)?$/.test((String(x)))){
        return false;
    }
    if(x==undefined){
      return false;
    }else{
      return true;
    }
  }
  validateR(r:number):boolean{
    if(this.validateString(r)){
      if(r<5 && r>-1){
        return true;
      }else{
        document.getElementById('hidR').hidden=false;
        return false;
      }
    }else{
      document.getElementById('hidR').hidden=false;
    }
  }
  goToIndex(){
    this.httpService.logout().subscribe(error=>console.log(error));
    this.router.navigate(['/']);
  }

  checkProbil(b:boolean) : string{
    return b == true? "HIT" : "MISS";
  }

}
