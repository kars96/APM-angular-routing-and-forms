import { Injectable } from "@angular/core";
import { ProductResolved, Product, IProvider } from './product';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ProductDetailResolver implements Resolve<ProductResolved> {

    constructor(private readonly productService: ProductService, private readonly formBuilder: FormBuilder) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const productId = route.paramMap.get('id');
        if (isNaN(+productId)) {
            const message = `${productId} is an invalid id`;
            return of({ product: null, productForm: null, error: message });
        }
        return this.productService.getProduct(+productId).pipe(
            map(
                product => ({ product: product, productForm: this.createForm(product) })
            ),
            catchError(
                error => {
                    const message = `Retrieval error: ${error}`;
                    return of({ product: null, error: message });
                }
            ));
    }
    createForm(product: Product): FormGroup {
        if (product) {
            const productForm = this.formBuilder.group(
                {
                    ...product,
                    tags: [product.tags],
                    providers: this.buildProviders(product.providers)
                });
            return productForm;
        }
    }

    buildProviders(providers: IProvider[]): FormArray {
        return this.formBuilder.array(providers.map(provider => this.formBuilder.group(provider)));
    }

}