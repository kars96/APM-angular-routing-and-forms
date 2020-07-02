import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login.component';


const routes: Route[] = [
    { path: 'login', component: LoginComponent}
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
export class UserRoutingModule { }
