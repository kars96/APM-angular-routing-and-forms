import { Injectable } from '@angular/core';
import { provideRoutes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private readonly authService: AuthService,
                private readonly router: Router) { }


    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkLoggedIn(route.path);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(route, state);
        return true || this.checkLoggedIn(state.url);
    }



    private checkLoggedIn(path: string) {
        if (this.authService.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    redirect: path
                }
            });
            return false;
        }
    }
}
