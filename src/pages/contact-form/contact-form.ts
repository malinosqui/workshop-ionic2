import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
    public networkProvider: NetworkProvider, public contactProvider: ContactProvider,
    public camera: Camera, public actionSheetCtrl: ActionSheetController) {
    this.navParams.get('contact');
  }

  save() {
    this.contactProvider.saveRemote(this.contact);
    this.navCtrl.pop();
  }

  getAvatar() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Origem da foto',
      buttons: [
        {
          text: 'Câmera',
          handler: () => {
            this.getImageFromCamera().then((image) => {
              this.contact.avatar = image;
            });
          }
        }, {
          text: 'Galeria',
          handler: () => {
            this.getImageFromGallery().then((image) => {
              this.contact.avatar = image;
            });
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();

  }

  getImageFromGallery() {
    return new Promise((resolve, error) => {
      let options = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 240,
        targetHeight: 240
      }

      this.camera.getPicture(options).then((imageData) => {
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        error(err);
      });
    });
  }

  getImageFromCamera() {
    return new Promise((resolve, error) => {
      let options = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        targetWidth: 240,
        targetHeight: 240
      }

      this.camera.getPicture(options).then((imageData) => {
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        error(err);
      });
    });
  }

}
