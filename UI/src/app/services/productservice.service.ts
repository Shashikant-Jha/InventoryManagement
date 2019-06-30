import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(id?: any) {
    if (id) {
      return this.httpClient.post('http://localhost:5001/api/Products/list', { name: id});
    } else {
      return this.httpClient.post('http://localhost:5001/api/Products/list', {});
    }
  }

  addProduct(payload) {
    return this.httpClient.post('http://localhost:5001/api/Products/add', payload);
  }
}
