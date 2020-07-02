import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class SelectiveLoadingStrategy implements PreloadingStrategy {
    preload(route: Route, fn: () => import("rxjs").Observable<any>): Observable<any> {
        if(route.data && route.data['preload']) {
            return fn();
        }
        return of(null);
    }
}
