import { Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';

@Injectable()

export class UserService {
  constructor(private http: HttpClient) {}
}
