import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailResolver } from './product-detail-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';

const routes: Route[] = [

    { path: '', component: ProductListComponent },
    {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductDetailResolver }
    },
    {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: { resolvedData: ProductDetailResolver },
        canDeactivate: [ProductEditGuard],
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: ProductEditInfoComponent },
            { path: 'tags', component: ProductEditTagsComponent }
        ]
    }
];

@NgModule(
    {
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    }
)
export class ProductsRoutingModule { }
