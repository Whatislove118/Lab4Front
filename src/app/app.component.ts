import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import {User} from './user';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root', //селектор
  templateUrl: './app.component.html', //где находится файл с html
  styleUrls: ['./app.component.css'] //где находится файл со стилями
})
export class AppComponent {
  title = 'Lab4';
  constructor(){}

  ngOnInit(){

  }
}
