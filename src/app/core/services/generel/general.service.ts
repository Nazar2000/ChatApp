import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public isWeb;
  public userId;

  constructor() {
    this.getUserId();
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token){
      const decoded: any = jwt_decode(token);
      this.userId = decoded.data.id;
    }
  }
}
