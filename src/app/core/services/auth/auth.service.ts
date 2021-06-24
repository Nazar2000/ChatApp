import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../api/api.service';

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
    return this.http.post(`${this.url}login/`, data);
  }

  signUp(data) {
    return this.http.post(`${this.url}register/`, data);
  }

  changeName(data) {
    return this.http.post(`${this.url}change-name/`, data);
  }
}
