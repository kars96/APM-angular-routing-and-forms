import { Injectable } from "@angular/core";
import { ProductResolved } from './product';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ProductDetailResolver implements Resolve<ProductResolved> {
    
    constructor(private readonly productService: ProductService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const productId = route.paramMap.get('id');
        if(isNaN(+productId)) {
            const message = `${productId} is an invalid id`;
            return of({product: null, error: message});
        }
        return this.productService.getProduct(+productId).pipe(
            map(
                product => ({product: product})
            ),
            catchError(
                error => {
                    const message = `Retrieval error: ${error}`;
                    return of({ product: null, error: message });
                }
            ));
    }
    
}