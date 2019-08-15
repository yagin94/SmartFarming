import {Component, OnInit} from '@angular/core';

import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import {Globals} from '../common/globalVariables';

@Component({
  providers: [Globals],
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  user: SocialUser;

  constructor(private globals: Globals) {
  }

  ngOnInit() {

  }

}
