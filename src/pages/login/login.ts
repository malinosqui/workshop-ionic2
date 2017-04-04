import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public userProvider: User) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.userProvider.login(this.user).then((authorized) => {
      if (authorized) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        let toast = this.toastCtrl.create({
          message: 'Usuário e(ou) senha inválidos',
          duration: 3000
        });
        toast.present();
        this.user.password = '';
      }
    });
  }
}
