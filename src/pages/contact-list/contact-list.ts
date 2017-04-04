import { Component, ApplicationRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ContactFormPage } from '../contact-form/contact-form'
import { ContactDetailPage } from '../contact-detail/contact-detail'
import { NetworkProvider } from '../../providers/network-provider';
import { ContactProvider } from '../../providers/contact-provider';
import { ConnectionStatus } from '../../enums/ConnectionStatus';

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
  offline: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public networkProvider: NetworkProvider,
    public contactProvider: ContactProvider, public alertCtrl: AlertController,
    public applicationRef: ApplicationRef) {

    // Verifica se a plataforma é mobile
    // Utilizada na regra de mostrar o botão de cadastrar apenas no desktop
    platform.ready().then(() => {
      this.isWeb = !platform.is('cordova');
    });

    networkProvider.getState().then((state: ConnectionStatus) => {
      this.offline = state == ConnectionStatus.Offline ? true : false;
    })

    networkProvider.connectSubscription.subscribe(() => {
      this.offline = false;
      this.sync();
    });

    networkProvider.disconnectSubscription.subscribe(() => {
      this.offline = true;
      this.applicationRef.tick();
    });
  }

  ionViewDidEnter() {
    this.get();
  }

  get() {
    this.contactProvider.get().then((contacts: Array<any>) => {
      this.contacts = contacts;
      this.contactsFiltered = contacts;
      this.applicationRef.tick();      
    });
  }

  sync() {
    this.contactProvider.syncWithRemote().then(() => {
      this.get();
      this.applicationRef.tick();      
    });
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
              this.contacts = this.contacts.filter(element => element.id !== contact.id);
              this.contactsFiltered = this.contacts.filter(element => element.id !== contact.id);
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
