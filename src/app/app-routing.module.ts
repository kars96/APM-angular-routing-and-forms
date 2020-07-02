import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { ProductsResolver } from './products/products-resolver.service';
import { SelectiveLoadingStrategy } from './custom.loadingstrategy';

/*
* Steps for lazy loading
1. Group the components into a module and define a proper route for the components
2. Reference this module using a path and mention the module in loadChildren and import
3. Change the canActivate guards of the parent route to canLoad
*/

/*
Types of eager loading
1. No Preoad - load all modules on demand
2. PreloadAll - load the initial module first then load all other modules (lazy eager loading)
3. Custom
*/

const routes: Routes = [
    { path: 'home', component: WelcomeComponent},
    {
        path: 'products',
        data: { preload: true },
        canActivate: [AuthGuard],
        resolve: { resolvedData: ProductsResolver },
        loadChildren: () => import('./products/product.module').then(
            (m) => m.ProductModule
        )
    },
    { path: 'welcome', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
  ];


@NgModule(
    {
        imports: [
            RouterModule.forRoot(routes, 
                { preloadingStrategy: SelectiveLoadingStrategy })
        ],
        exports: [ 
            RouterModule
        ]
    }
)
export class AppRoutingModule{ }