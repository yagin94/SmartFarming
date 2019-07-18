import {AuthService, LinkedInLoginProvider, SocialUser} from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class LoginService {
  user: SocialUser;
  constructor(private authService: AuthService, private http: HttpClient) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((x) => {
        this.user = x;
        this.sendToRestApiMethod(this.user.idToken);
        console.log(this.user);
      }).catch((x) => {
      console.log('here!!!!:');
    });
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
  }
}
