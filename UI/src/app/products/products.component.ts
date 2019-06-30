import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productservice.service';
import { UserService } from '../services/userservice.service';

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
  productSelected = false;

  constructor(private productService: ProductService, private userService: UserService) {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res['message'];
        console.log(this.products);
        this.numOfProducts = this.products.length;
      },
      (err) => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

  populateData(productDetails) {
    this.productSelected = true;
    this.selectedProductName = productDetails._id;
    this.selectedProductPrice = productDetails.price;
    this.selectedProductRating = productDetails.rating;
  }

  removeSelection() {
    this.selectedProductName = '';
    this.selectedProductPrice = NaN;
    this.selectedProductRating = NaN;
    this.productSelected = false;
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
          this.productSelected = false;
          this.selectedProductName = '';
          this.selectedProductPrice = NaN;
          this.selectedProductRating = NaN;
          this.refreshView();
        }, (err) => {
          console.log(err);
        }
      );
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.selectedProductName).subscribe(
      (res) => {
        console.log(res);
        this.productSelected = false;
        this.selectedProductName = '';
        this.selectedProductPrice = NaN;
        this.selectedProductRating = NaN;
        this.refreshView();
      }, (err) => {
        console.log(err);
      }
    );
  }

  updateProduct() {
    const payload = {
      name: this.selectedProductName,
      price: this.selectedProductPrice,
      rating: this.selectedProductRating
    };
    this.productService.updateProduct(payload).subscribe(
      (res) => {
        console.log(res);
        this.productSelected = false;
        this.selectedProductName = '';
        this.selectedProductPrice = NaN;
        this.selectedProductRating = NaN;
        this.refreshView();
      }, (err) => {
        console.log(err);
      }
    );
  }

  refreshView() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res['message'];
        console.log(this.products);
        this.numOfProducts = this.products.length;
      },
      (err) => {
        console.log(err);
      });
  }

  logout() {
    this.userService.logout();
  }
}
