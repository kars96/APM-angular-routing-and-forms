import { Component, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  private darkTheme = false;
  @ViewChild('navBar') navBar: ElementRef;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public toggleTheme() {
    const currentColor = this.darkTheme;
    this.darkTheme = !this.darkTheme;
    if(this.darkTheme) {
      this.navBar.nativeElement.classList.replace('navbar-light', 'navbar-dark');
      this.navBar.nativeElement.classList.replace('bg-light', 'bg-dark');
    } else {
      this.navBar.nativeElement.classList.replace('navbar-dark', 'navbar-light');
      this.navBar.nativeElement.classList.replace('bg-dark', 'bg-light');
    }
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService, private readonly router: Router) { }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
