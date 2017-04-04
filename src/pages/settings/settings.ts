import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OnboardPage } from '../onboard/onboard';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public alertCtrl: AlertController, public app: App) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  reset() {
    this.storage.clear();
  }

  logout() {
    this.storage.remove('user');
    this.app.getRootNav().setRoot(OnboardPage);
  }

  confirmReset() {
    let confirm = this.alertCtrl.create({
      title: 'Deseja limpar todos os dados?',
      message: 'Você será desconectado e precisará entrar na aplicação novamente.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Limpar',
          handler: () => {
            this.reset();
            this.app.getRootNav().setRoot(OnboardPage);
          }
        }
      ]
    });
    confirm.present();
  } ƒ

}
