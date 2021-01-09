import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data:Array<object>=[];
  singledata:Array<object>=[];
  cartLocal:Array<object>=[];
  


  constructor(private ProductService:ProductsService) { }

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
    

  }
  addToCart(id){
    // console.log(id);
    this.ProductService.setParam(id);
    this.ProductService.getProduct().subscribe({
      next:(data)=> {
        // console.log('success: ', data);
        this.singledata=data;
        // console.log('myData: ', this.singledata);
        document.getElementById('add'+id).setAttribute("style", "display:none");
        document.getElementById('btnShowP'+id).setAttribute("style", "display:inline");
        document.getElementById('btnShowM'+id).setAttribute("style", "display:inline");

        //emptycart
        if (!JSON.parse(localStorage.getItem('myCart'))) {
          this.singledata['quantity']=1;
          
          this.cartLocal.push(this.singledata);
          localStorage.setItem("myCart", JSON.stringify(this.cartLocal));
         //cart not empty
        }else{
          
          this.cartLocal=JSON.parse(localStorage.getItem('myCart'));
         
          //check if element already in cart
          
          if(this.cartLocal.findIndex(a => a['id'] ==id)>=0){
            let index=this.cartLocal.findIndex(a => a['id'] ==id);
            // this.cartLocal["quantity"]
            this.cartLocal[index]["quantity"]=(this.cartLocal[index]["quantity"])+1;
              // console.log(this.cartLocal[index]["quantity"]);
            }else{
          ////////////////////////////////////////////////////////////////////////////
                  this.singledata['quantity']=1;
                  // console.log(this.singledata);
                  this.cartLocal.push(this.singledata);
                  
                  
                }
                localStorage.setItem("myCart", JSON.stringify(this.cartLocal));
                  // console.log(this.cartLocal);
         
        }
      },
      error:(msg)=> {
        // console.log('error: ', msg);
      }
    });

  }

}
