import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { ContactFormPage } from '../pages/contact-form/contact-form';
import { ContactDetailPage } from '../pages/contact-detail/contact-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { NetworkProvider } from '../providers/network-provider';
import { ContactProvider } from '../providers/contact-provider';
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactListPage,
    ContactFormPage,
    ContactDetailPage,
    ParallaxHeader,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactListPage,
    ContactFormPage,
    ContactDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NetworkProvider,
    ContactProvider,
    Network
  ]
})
export class AppModule { }
