import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Product, ProductResolved } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {

  errorMessage: string;
  product: Product;

  @Input() public productForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(
      data => {
        const resolvedData = data['resolvedData'];
        if (resolvedData.productForm) {
          this.productForm = resolvedData.productForm;
          this.product = resolvedData.product;
        }
        this.errorMessage = resolvedData.errorMessage;
      }
    )
  }

  buildProviders(): FormGroup {
    return this.formBuilder.group({
      providerName: '',
      providerAddress: ''
    });
  }

  get providers(): FormArray {
    return this.productForm.get('providers') as FormArray;
  }

  deleteProvider(i: number) {
    this.providers.removeAt(i);
  }

  addProvider() {
    this.providers.push(this.buildProviders());
  }
}
