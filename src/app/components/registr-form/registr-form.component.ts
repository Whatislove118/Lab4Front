import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../HttpService';
import {User} from '../../user';
import {Router, Routes} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {FormComponent} from '../form/form.component';

@Component({
  selector: 'app-registr-form',
  templateUrl: './registr-form.component.html',
  styleUrls: ['./registr-form.component.css']
})
export class RegistrFormComponent implements OnInit {
  login:string = "";
  password:string="";
  check:boolean=true;
  answer:string="";
  user:User;

  constructor(private httpService: HttpService,private router:Router) { }

  ngOnInit() {
  }
  goMain(){
    this.httpService.setUser(this.user);
    this.httpService.reg=true;
    this.router.navigate(['/main']);
  }
  validateForm():boolean{
    if(this.password.length<4){
      alert("Пароль должен быть не менее 5 символов");
      this.check=false;
    }

    if(this.login==""){
      alert("Введите логин!");
      this.check=false;
    }
    if(this.password==""){
      alert("Введите пароль!");
      this.check=false;
    }

    return this.check;
  }
  sendToServer(){
    if(this.validateForm()){
      this.user=new User(this.login,this.password);
      this.httpService.postData(this.user,'register').subscribe(data=>{this.answer="Вы были успешно зарегистрированы!";
      this.httpService.reg=true;},error =>this.answer="Данный логин уже занят! Попробуйте еще раз" );
    }else{
      console.log("err");
    }
  }
  sendToServerToLogin() {
    if (this.validateForm()) {
      this.user=new User(this.login,this.password);
      this.httpService.postData(this.user,"login").subscribe(data =>this.goMain() , error => this.answer = "Проверьте правильность введенных данных!");
    }
  }


}
