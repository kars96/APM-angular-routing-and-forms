import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    canDeactivate(component: ProductEditComponent, currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot):
     boolean |UrlTree |Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
         if (component.isDirty()) {
             const productName = component.product.productName || 'New Product';
             return confirm(`You will lose all changes made to ${productName}. Continue?`);
         }
         return true;
    }

}
