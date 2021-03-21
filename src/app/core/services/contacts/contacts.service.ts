import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url = this.api.URL;
  public contactsArray = [];

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
  }

  checkContact(data) {
    return this.http.get(`${this.url}contacts/contact-check/${data.telNumber}`);
  }

  updateContactList(data) {
    return this.http.post(`${this.url}contacts/contacts/`, data);
  }

  getContacts(id) {
    return this.http.get(`${this.url}contacts/contacts-list/`, id);
  }
}