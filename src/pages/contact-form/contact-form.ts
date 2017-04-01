import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network-provider';
import { ContactProvider } from '../../providers/contact-provider';

/*
  Generated class for the ContactForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-form',
  templateUrl: 'contact-form.html'
})
export class ContactFormPage {
  contact: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public networkProvider: NetworkProvider, public contactProvider: ContactProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactFormPage');
  }

  save() {
    this.contactProvider.saveRemote(this.contact);
    this.navCtrl.pop();
  }

}
