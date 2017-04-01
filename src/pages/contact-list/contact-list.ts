import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ContactFormPage } from '../contact-form/contact-form'
import { ContactDetailPage } from '../contact-detail/contact-detail'
import { NetworkProvider } from '../../providers/network-provider';
import { ContactProvider } from '../../providers/contact-provider';

/*
  Generated class for the ContactList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html'
})
export class ContactListPage {
  isWeb: Boolean = false;
  contacts: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public networkProvider: NetworkProvider,
    public contactProvider: ContactProvider) {

    // Verifica se a plataforma é mobile
    // Utilizada na regra de mostrar o botão de cadastrar apenas no desktop
    platform.ready().then(() => {
      this.isWeb = !platform.is('cordova');
    });

  }

  ionViewDidLoad() {
    this.contactProvider.getRemote().then((contacts: Array<any>) => {
      this.contacts = contacts;
    });
  }

  sync() {

  }

  goToForm(contact) {
    this.navCtrl.push(ContactFormPage, { contact });
  }

  goToDetail(contact) {
    this.navCtrl.push(ContactDetailPage, { contact });
  }

}
