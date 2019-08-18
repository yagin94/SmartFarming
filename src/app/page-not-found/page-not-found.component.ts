import {Component, OnInit} from '@angular/core';

import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import {Globals} from '../common/globalVariables';
import {Router} from '@angular/router';

@Component({
  providers: [Globals],
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  user: SocialUser;
  loading = true;
  constructor(private globals: Globals,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = false;
  }
  click() {
    this.loading = true;
  }
  isLoggedIn() {
    if (localStorage.getItem('currentAppUser')) {
      return true;
    }
    return false;
  }
  userDetails() {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: JSON.parse(localStorage.getItem(`currentAppUser`)).userId}});
  }
}
