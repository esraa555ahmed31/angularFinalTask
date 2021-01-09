import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  cartLocal:Array<object>=[];
  // searchText:any;

  constructor() { }

  ngOnInit(): void {
    //dispaly cart
    if (!JSON.parse(localStorage.getItem('myCart'))) {
      console.log('no items');

    } else {
      this.cartLocal = JSON.parse(localStorage.getItem('myCart'));
    }
  }


}
