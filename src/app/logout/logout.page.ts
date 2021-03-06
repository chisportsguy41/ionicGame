import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  errors: Array<any> = [];
  errorMessage: string;

  constructor(private cookieService: CookieService, private authService: AuthService) { }

  ngOnInit() {
    this.logOut();
  }
 
  logOut(): void {
    this.authService.logOut().subscribe(
      (response: any) => {
        this.cookieService.delete('sugar', '/game');
        window.location.href = '/game';
      }
    );
  }

}
