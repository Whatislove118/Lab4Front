import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  head:string;
  x:string;
  constructor() { }

  ngOnInit() {
    this.head='Почикалин Владислав';
  }

}
