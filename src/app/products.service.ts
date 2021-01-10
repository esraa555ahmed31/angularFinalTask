import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  key: number;
  // id: number;

  constructor(private http:HttpClient) { }

  getList(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
 }
 setParam(id){
   this.key=id;
 }
//  setParam2(id){
//   this.key=id;
// }


 getProduct(): Observable<any> {
  return this.http.get('https://fakestoreapi.com/products/'+this.key);
}
 
}
