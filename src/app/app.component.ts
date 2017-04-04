import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { OnboardPage } from '../pages/onboard/onboard';

import { User } from '../providers/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = OnboardPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public userProvider: User) {

    this.userProvider.getLocal().then((user) => {
      if (!!user) {
        this.rootPage = TabsPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }
}
