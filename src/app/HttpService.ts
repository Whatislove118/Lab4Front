import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {Point} from './Point';

@Injectable()
export class HttpService{
  private user:User;
  reg:boolean;
constructor(private http:HttpClient){}

postData(user:User,url:string) : Observable<any>{
  return this.http.post('http://localhost:8080/'+url,{login:user.login,password:user.password}, {
  headers:new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'POST,GET',
    'Authorization':'authkey',
    'userid':'1'
  })
  });
}
postDataPoints(point:Point) : Observable<any>{
  return this.http.post('http://localhost:8080/checkpoints',point);
}
// getDataPoints() :Observable<any>{
//   return this.http.post('http://localhost:8080/getpoints',this.user);
// }
logout(){
  return this.http.get('http://localhost:8080/logout');
}
setUser(user:User){
  this.user=user;
}
getUser():User{
  return this.user;
}
}
