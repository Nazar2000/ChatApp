import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public userId;
  public userName;
  public authorised = false;

  constructor() {
    this.getUserId();
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authorised = true;
      const decoded: any = jwt_decode(token);
      this.userId = decoded.data.id;
      this.userName = decoded.data.username;
    }
  }
}
