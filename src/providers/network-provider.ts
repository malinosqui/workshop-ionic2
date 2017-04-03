import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';
import moment from 'moment';
// seta locale do moment para pt-br
import 'moment/locale/pt-br';
import { ConnectionStatus } from '../enums/ConnectionStatus';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

// ATENÇÃO: Necessário para o moment funcionar com o IMPORT
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Injectable()
export class NetworkProvider {
  disconnectSubscription: any;
  connectSubscription: any;

  constructor(public http: Http, public storage: Storage,
    private network: Network) {

    this.disconnectSubscription = network.onDisconnect();
    this.connectSubscription = network.onConnect();

    this.disconnectSubscription.subscribe(() => {
      this.setState(ConnectionStatus.Offline);
    });

    this.connectSubscription.subscribe(() => {
      this.setState(ConnectionStatus.Online);
    });
  }

  // Seta data da ultima atualização para cada cadastro
  setLastSync(type: String): void {
    this.storage.set(`lastSync_${type}`, moment().format('YYYY-MM-DD HH:mm'));
  }

  // Pega data da última atualização para cada cadastro
  getLastSync(type) {
    return this.storage.get(`lastSync_${type}`);
  }

  // Seta estado da conexão
  setState(state: ConnectionStatus) {
    this.storage.set('state', state);
  }

  // Pega estado da conexão
  getState(): Promise<ConnectionStatus> {
    return new Promise((resolve) => {
      this.storage.get('state').then((state) => {
         resolve(state || navigator.onLine ? ConnectionStatus.Online : ConnectionStatus.Offline);
      }).catch((err) => {
        console.log('erro ao buscar estado da conexão:', err);
        resolve(navigator.onLine ? ConnectionStatus.Online : ConnectionStatus.Offline)
      });
    });
  }

}
