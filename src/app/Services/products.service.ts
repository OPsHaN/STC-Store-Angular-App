import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  //api products
  getproductList(limit: number, skip: number) {
    return this.http.get<any>(
      'https://dummyjson.com/products?limit=' + limit + '&skip=' + skip
    );
  }

  //api single product
  getSingleproduct(productId: string) {
    return this.http.get<any>('https://dummyjson.com/products/' + productId);
  }

  //api categories
  getaAllcategories() {
    return this.http.get<any>('https://dummyjson.com/products/categories');
  }

  //api filterCategories
  getFiltercategories(keyword: string) {
    return this.http.get<any>(
      'https://dummyjson.com/products/category/' + keyword
    );
  }

  //add product
  createPorduct(model: any) {
    return this.http.post<any>('https://dummyjson.com/products/add', model);
  }

  //edit product
  editProduct(model: any) {
    return this.http.put<any>('https://dummyjson.com/products/1', model);

  }

  //delete product
  deleteProduct(model: any) {
    return this.http.delete<any>('https://dummyjson.com/products/1', model);

  }
}
