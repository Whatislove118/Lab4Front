import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
  CanActivateChild, Router
} from '@angular/router';
import {Observable} from "rxjs";
import {HttpService} from './HttpService';
import {Injectable} from '@angular/core';

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private httpService: HttpService,private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.httpService.getUser() == undefined) {
      return this.router.navigate(['']);;
            }
            return true;
  }

}
  // canLd(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if (this.httpService.reg == false) {
  //         return false;
  //       }
  //       return true;
  //     }
  //
  // canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   if (this.httpService.reg == false) {
  //     return false;
  //   }
  //   return true;
  // }
  // }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
  //   if (this.httpService.reg = false) {
  //     return false;
  //   }
  //   return true;
  // }


