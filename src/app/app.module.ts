import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { OnboardPage } from '../pages/onboard/onboard';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { ContactFormPage } from '../pages/contact-form/contact-form';
import { ContactDetailPage } from '../pages/contact-detail/contact-detail';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { NetworkProvider } from '../providers/network-provider';
import { ContactProvider } from '../providers/contact-provider';
import { User } from '../providers/user';
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactListPage,
    ContactFormPage,
    ContactDetailPage,
    ParallaxHeader,
    SettingsPage,
    OnboardPage,
    LoginPage,
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
    SettingsPage,
    OnboardPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NetworkProvider,
    ContactProvider,
    Network,
    Camera,
    User
  ]
})
export class AppModule { }
