import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class ContactProvider {
  API_ENDPOINT: String = 'http://127.0.0.1:3000';
  headers: any = { 'Content-Type': 'application/json' };

  constructor(public http: Http, public storage: Storage) {

  }

  getByLastSyncRemote(lastSync) {
    return new Promise((resolve) => {
      this.http.get(`${this.API_ENDPOINT}/contact/lastsync/${lastSync}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getRemote() {
    return new Promise((resolve) => {
      this.http.get(`${this.API_ENDPOINT}/contact`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  saveRemote(contact) {
    return new Promise(resolve => {
      this.http.post(`${this.API_ENDPOINT}/contact`, JSON.stringify(contact), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getByIdRemote(id) {
    return new Promise((resolve) => {
      this.http.get(`${this.API_ENDPOINT}/contact/${id}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  removeRemote(id) {
    return new Promise((resolve) => {
      this.http.delete(`${this.API_ENDPOINT}/contact/${id}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  saveManyRemote(contacts) {
    return new Promise(resolve => {
      this.http.post(this.API_ENDPOINT + '/contact/many', JSON.stringify(contacts), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
