import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data: Array<object> = [];
  singledata: Array<object> = [];
  cartLocal: Array<object> = [];




  constructor(private ProductService: ProductsService) { }

  ngOnInit(): void {
    // localStorage.setItem('myItmes'," {id:5,price:20}");

    this.ProductService.getList().subscribe({
      next: (data) => {
        // console.log('success: ', data);
        this.data = data;
        // console.log('myData: ', data);
      },
      error: (msg) => {
        // console.log('error: ', msg);
      }
    });
    //make addtocart button dissapear when item already in cart
    setTimeout(() => {
      let arr = [];
      //  console.log( JSON.parse(localStorage.getItem('myCart'))["id"]);
      JSON.parse(localStorage.getItem('myCart')).forEach(element => arr.push(element["id"]));
      console.log(arr);
      for (let index = 0; index < arr.length; index++) {
        // console.log(arr[index]);
        // if((JSON.parse(localStorage.getItem('myCart')).findIndex(a => a['id'] ==arr[index]))>=0){
        console.log('add' + arr[index]);

        document.getElementById('add' + arr[index]).setAttribute("style", "display:none");
        document.getElementById('btnShowP' + arr[index]).setAttribute("style", "display:inline");
        document.getElementById('btnShowM' + arr[index]).setAttribute("style", "display:inline");
        // console.log(JSON.parse(localStorage.getItem('myCart')).findIndex(a => a['id'] ==arr[index]));
      }



    }, 1500);


  }
  ////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////






  addToCart(id) {
    // console.log(id);
    this.ProductService.setParam(id);
    this.ProductService.getProduct().subscribe({
      next: (data) => {
        // console.log('success: ', data);
        this.singledata = data;
        // console.log('myData: ', this.singledata);
        document.getElementById('add' + id).setAttribute("style", "display:none");
        document.getElementById('btnShowP' + id).setAttribute("style", "display:inline");
        document.getElementById('btnShowM' + id).setAttribute("style", "display:inline");

        //emptycart
        if (!JSON.parse(localStorage.getItem('myCart'))) {
          this.singledata['quantity'] = 1;

          this.cartLocal.push(this.singledata);
          localStorage.setItem("myCart", JSON.stringify(this.cartLocal));
          //cart not empty
        } else {

          this.cartLocal = JSON.parse(localStorage.getItem('myCart'));

          //check if element already in cart

          if (this.cartLocal.findIndex(a => a['id'] == id) >= 0) {
            let index = this.cartLocal.findIndex(a => a['id'] == id);
            // this.cartLocal["quantity"]
            this.cartLocal[index]["quantity"] = (this.cartLocal[index]["quantity"]) + 1;
            // console.log(this.cartLocal[index]["quantity"]);
          } else {
            ////////////////////////////////////////////////////////////////////////////
            this.singledata['quantity'] = 1;
            // console.log(this.singledata);
            this.cartLocal.push(this.singledata);


          }
          localStorage.setItem("myCart", JSON.stringify(this.cartLocal));
          // console.log(this.cartLocal);

        }
      },
      error: (msg) => {
        // console.log('error: ', msg);
      }
    });

  }
  decreaseQuantityInCart(id) {
    this.cartLocal = JSON.parse(localStorage.getItem('myCart'));
    if (this.cartLocal.findIndex(a => a['id'] == id) >= 0) {
      let index = this.cartLocal.findIndex(a => a['id'] == id);
      // if quantity of item <1 delete from cart
      if (this.cartLocal[index]["quantity"] < 1) {
        this.cartLocal.splice(this.cartLocal.findIndex(a => a['id'] == id), 1);
        document.getElementById('add' + id).setAttribute("style", "display:block");
        document.getElementById('btnShowP' + id).setAttribute("style", "display:none");
        document.getElementById('btnShowM' + id).setAttribute("style", "display:none");
      } else {
        this.cartLocal[index]["quantity"] = (this.cartLocal[index]["quantity"]) - 1;
        // console.log(this.cartLocal[index]["quantity"]);
      }
      localStorage.setItem("myCart", JSON.stringify(this.cartLocal));
    }

  }

}
