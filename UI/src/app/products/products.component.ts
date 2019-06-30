import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: [];
  numOfProducts: number;
  selectedProductName: string;
  selectedProductPrice; number;
  selectedProductRating: number;

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(
      (res) => {
        // console.log(res);
        // console.log(response);
        this.products = res['message'];
        console.log(this.products);
        this.numOfProducts = this.products.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  populateData(productDetails) {
    this.selectedProductName = productDetails._id;
    this.selectedProductPrice = productDetails.price;
    this.selectedProductRating = productDetails.rating;
  }

  removeSelection() {
    this.selectedProductName = '';
    this.selectedProductPrice = NaN;
    this.selectedProductRating = NaN;
  }

  addProduct() {
    if (this.selectedProductName && this.selectedProductPrice && this.selectedProductRating) {
      const payload = {
        name: this.selectedProductName,
        price: this.selectedProductPrice,
        rating: this.selectedProductRating
      };
      this.productService.addProduct(payload).subscribe(
        (res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
    }
  }
}
