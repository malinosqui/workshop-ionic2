import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { NetworkProvider } from './network-provider';
import { ConnectionStatus } from '../enums/ConnectionStatus';
import _ from 'lodash';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class ContactProvider {
  API_ENDPOINT: String = 'http://192.168.1.102:3000';
  headers: any = { 'Content-Type': 'application/json' };

  constructor(public http: Http, public storage: Storage,
    public networkProvider: NetworkProvider) {

  }

  get() {
    return new Promise((resolve) => {
      this.networkProvider.getState().then((state: ConnectionStatus) => {
        this.networkProvider.getLastSync('contact').then((lastSyncDate) => {
          if (!!lastSyncDate) {

            this.getLocal().then((localContacts: Array<any>) => {
              if (state === ConnectionStatus.Online) {
                this.getByLastSyncRemote(lastSyncDate).then((remoteContacts) => {
                  this.saveManyLocal(remoteContacts).then((contacts) => {
                    resolve(contacts);
                  });
                });
              }
              else if (state !== ConnectionStatus.Offline && localContacts.length <= 0) {
                this.getRemote().then((remoteContacts) => {
                  this.saveManyLocal(remoteContacts).then((contacts) => {
                    resolve(contacts);
                  });
                });
              } else {
                resolve(localContacts);
              }
            });

          } else {
            if (state === ConnectionStatus.Online) {
              this.getRemote().then((remoteContacts) => {
                this.saveManyLocal(remoteContacts).then((localContacts) => {
                  resolve(localContacts);
                });
              });
            } else {
              resolve([]);
            }
          }
        });
      });
    });
  }

  getByLastSyncRemote(lastSync) {
    return new Promise((resolve) => {
      this.http.get(`${this.API_ENDPOINT}/contact/updatedate/${lastSync}`)
        .map(res => res.json())
        .subscribe(data => {
          this.networkProvider.setLastSync('contact');
          resolve(data);
        });
    });
  }

  getRemote() {
    return new Promise((resolve) => {
      this.http.get(`${this.API_ENDPOINT}/contact`)
        .map(res => res.json())
        .subscribe(data => {
          this.networkProvider.setLastSync('contact');
          resolve(data);
        });
    });
  }

  getLocal() {
    return new Promise((resolve, error) => {
      this.storage.get('contacts').then((contacts) => {
        resolve(contacts);
      }).catch((err) => {
        resolve([]);
      });
    });
  }

  save(contact) {
    return new Promise((resolve) => {
      contact.uid = contact.uid || this.guid();

      this.saveLocal(contact).then((localContacts: Array<any>) => {
        this.networkProvider.getState().then((state: ConnectionStatus) => {
          if (state === ConnectionStatus.Online) {
            this.saveRemote(contact).then((contacts) => {
              resolve();
            }).catch(() => {
              contact.unsync = true;
              this.saveLocal(contact).then(() => {
                resolve();
              });
            });
          } else {
            contact.unsync = true;
            this.saveLocal(contact).then(() => {
              resolve();
            });
          }
        });
      });
    });
  }

  saveLocal(contact) {
    return new Promise(resolve => {
      this.getLocal().then((localContacts: Array<any>) => {
        // Verifica se já existe esse contato na base local
        if (!localContacts) {
          localContacts = [];
        }
        const existsContact = localContacts.filter(el => el.uid === contact.uid).length > 0 ? true : false;
        if (existsContact) {
          localContacts = localContacts.filter(el => el.uid !== contact.uid);
          localContacts.push(contact);
          this.storage.set('contacts', localContacts).then(() => {
            resolve(localContacts);
          });
        } else {
          localContacts.push(contact);
          this.storage.set('contacts', localContacts).then(() => {
            resolve(localContacts);
          });
        }
      });
    });
  }

  saveManyLocal(contacts: any) {
    return new Promise((resolve) => {
      this.getLocal().then((localContacts: Array<any>) => {

        if (!localContacts) {
          localContacts = [];
        }

        let existsContacts = [];

        contacts.forEach(element => {
          existsContacts.push(localContacts.find(x => x.uid === element.uid));
        });
        
        localContacts = _.pullAllBy(localContacts, existsContacts, 'uid');

        contacts = _.unionBy(localContacts, contacts, 'uid');

        this.storage.set('contacts', contacts).then((contacts) => {
          resolve(contacts);
        });
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

  saveManyRemote(contacts) {
    return new Promise(resolve => {
      this.http.post(this.API_ENDPOINT + '/contactSaveMany', JSON.stringify(contacts), { headers: this.headers })
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

  syncWithRemote() {
    return new Promise((resolve) => {
      this.getLocal().then((localContacts: Array<any>) => {
        let localOnlyContacts = localContacts.filter(el => el.unsync);

        if (localOnlyContacts.length > 0) {
          this.saveManyRemote(localOnlyContacts).then(() => {
            localContacts = localContacts.map((el) => {
              el.unsync = false;
              return el;
            });

            this.saveManyLocal(localContacts).then((contacts) => {
              resolve();
            });
          });
        } else {
          resolve();
        }
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

  // Algoritmo de guid
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  // Gera guid
  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

}
