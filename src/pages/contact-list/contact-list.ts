import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
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
  contacts: Array<any> = [];
  contactsFiltered: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public networkProvider: NetworkProvider,
    public contactProvider: ContactProvider, public alertCtrl: AlertController) {

    // Verifica se a plataforma é mobile
    // Utilizada na regra de mostrar o botão de cadastrar apenas no desktop
    platform.ready().then(() => {
      this.isWeb = !platform.is('cordova');
    });

  }

  ionViewDidEnter() {
    this.contactProvider.getRemote().then((contacts: Array<any>) => {
      this.contacts = contacts;
      this.contactsFiltered = contacts;
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

  searchContacts(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.contactsFiltered = this.contacts.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.contactsFiltered = this.contacts;
    }
  }

  remove(contact) {
    this.confirmRemove(contact);
  }

  confirmRemove(contact) {
    let confirm = this.alertCtrl.create({
      title: 'Remover esse contato?',
      message: 'Ao remover esse contato não será possível recuperá-lo.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Remover',
          handler: () => {
            this.contactProvider.removeRemote(contact.id).then(() => {

              const contactsIndex = this.contacts.indexOf(contact);
              const contactsFilteredIndex = this.contacts.indexOf(contact);

              this.contacts.splice(contactsIndex, 1);
              this.contactsFiltered.splice(contactsFilteredIndex, 1);
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
