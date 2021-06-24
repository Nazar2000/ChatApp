import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public userId;
  public userName;
  public userNumber;
  public authorised = false;
  public recipientName;

  constructor(
    private router: Router,
  ) {
    this.getUserId();
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authorised = true;
      const decoded: any = jwt_decode(token);
      this.userId = decoded.data.id;
      this.userName = decoded.data.username;
      this.userNumber = decoded.data.telNumber;
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.authorised = false;
    this.router.navigate(['/login']);
  }
}
