import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = this.api.URL;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
  }

  logIn(data?) {
    return this.http.post(`${this.url}user/login/`, data);
  }

  signUp(data) {
    return this.http.post(`${this.url}user/register/`, data);
  }
}
