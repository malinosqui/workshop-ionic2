import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactListPage } from '../contact-list/contact-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ContactListPage;
  tab2Root: any = AboutPage;

  constructor() {

  }
}
