import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string;

  dataIsValid: { [key: string]: boolean };
  private currentProduct: Product;
  private originalProduct: Product;
  public productForm: FormGroup;

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private readonly actRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.actRoute.data.subscribe(
      (data) => {
        const resolvedData = data['resolvedData'];
        console.log(resolvedData)
        this.product = resolvedData.product;
        this.productForm = resolvedData.productForm;
        this.errorMessage = resolvedData.error;
        // this.onProductRetrieved(product);
      });
  }

  get product(): Product {
    return this.currentProduct;
  }

  set product(value: Product) {
    this.currentProduct = value;
    this.originalProduct = { ...value };
  }

  public isDirty(): boolean {
    return JSON.stringify(this.currentProduct) !== JSON.stringify(this.originalProduct);
  }
  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      // this.productForm = this.fb.group(
      //   { ...this.product,
      //     providers: this.fb.group({
      //       providerName: '',
      //       providerAddress: ''
      //     }
      //     )
      //    });
      //    console.log(this.productForm)
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveProduct(): void {
    if (this.isValid() === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.productForm.value).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.productForm.value).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.resetForm();
    // Navigate back to the product list
    this.router.navigate(['/products']);
  }
  resetForm() {
    this.product = null;
    this.originalProduct = null;
    this.dataIsValid = null;
  }

  isValid(tabName?: string) {
    if(this.productForm) {
      return this.productForm.valid;
    }
    return true;
  }

  validate() {
    this.dataIsValid = {};

    if (this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    if (this.product.category && this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
