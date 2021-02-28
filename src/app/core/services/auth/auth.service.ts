import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiService} from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = this.api.URL;
  public clientKey;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
  }

  logIn() {
    const payload = new HttpParams()
      .set('username', 'web@gmail.com')
      .set('password', 'admin');
    return this.http.post(`${this.url}/app/login/`, payload);
  }
}
