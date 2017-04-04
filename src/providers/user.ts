import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from './network-provider';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello User Provider');
  }

  login(user) {
    return new Promise((resolve) => {
      if (user.username.toLowerCase() === 'admin' && user.password === '123456') {
        this.storage.set('user', user).then(() => {
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  getLocal() {
    return this.storage.get('user');
  }

}
