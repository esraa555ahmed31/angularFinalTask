import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cartLocal:Array<object>=[];

  constructor() { }

  ngOnInit(): void {

    if (!JSON.parse(localStorage.getItem('myCart'))) {
     console.log('no items');
     
    }else{
      this.cartLocal=JSON.parse(localStorage.getItem('myCart'));
      // this.cartLocal.push(this.singledata);
      // localStorage.setItem("myCart", JSON.stringify(this.cartLocal));
      // console.log(this.cartLocal);
    }
  }
  deleteProduct(i) {
    this.cartLocal=JSON.parse(localStorage.getItem('myCart'));
    if (i > -1) {
      this.cartLocal.splice(i, 1);
       localStorage.setItem("myCart", JSON.stringify(this.cartLocal));
      console.log(this.cartLocal);
    }
  }


}
