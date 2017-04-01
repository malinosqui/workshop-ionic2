import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ContactDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
  contact: Object = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contact = this.navParams.get('contact');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
  }

}
