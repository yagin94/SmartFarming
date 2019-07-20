import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider, SocialUser} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../../qa-page/qa.model';

@Component({
  providers: [LoginService],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appUser$: AppUser;
  user: SocialUser;

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  getResponse(token: string): void {
    this.appUser$ = new AppUser();
    this.http.post<AppUser>('http://localhost:8080/login',
      {
        provider: this.user.provider,
        id: this.user.id,
        email: this.user.email,
        name: this.user.name,
        photoUrl: this.user.photoUrl,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        authToken: this.user.authToken,
        idToken: this.user.idToken,
        authorizationCode: this.user.authorizationCode
      }).subscribe(app => localStorage.setItem('currentAppUser', JSON.stringify(app)) );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((x) => {
        this.user = x;
        this.sendToRestApiMethod(this.user.idToken);
        this.getResponse(this.user.idToken);
        console.log(this.user);
        console.log(this.appUser$);
      }).catch((x) => {
      console.log('here!!!!:');
    });
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  sendToRestApiMethod(token: string): void {
    try {
      this.http.post('http://localhost:8080/login',
        {
          provider: this.user.provider,
          id: this.user.id,
          email: this.user.email,
          name: this.user.name,
          photoUrl: this.user.photoUrl,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          authToken: this.user.authToken,
          idToken: this.user.idToken,
          authorizationCode: this.user.authorizationCode
        }).subscribe(
        onSuccess => {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
        }, onFail => {
          console.log(onFail);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('currentAppUser');
    localStorage.removeItem('currentUser');
  }

}
