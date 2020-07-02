import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsResolver implements Resolve<Product[]> {

    constructor(private readonly productService: ProductService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Product[] | Observable<Product[]> | Promise<Product[]> {
        return this.productService.getProducts();
    }
}
