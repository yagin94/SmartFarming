import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class LoginService {

  constructor(private http: HttpClient) { }

  signInGoogle() {}
}
