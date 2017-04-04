import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'

/*
  Generated class for the Onboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html'
})
export class OnboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardPage');
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
