import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  data:any={};

  constructor(private route: ActivatedRoute,private ProductService:ProductsService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.ProductService.setParam(this.id);

      // In a real app: dispatch action to load the details here.
   });
   this.ProductService.getProduct().subscribe({
    next:(data)=> {
      console.log('success: ', data);
      this.data=data;
      console.log('myData: ', data);
    },
    error:(msg)=> {
      console.log('error: ', msg);
    }
  });
  }

}
