import { Component } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page'
import { Tab2Page } from '../tab2/tab2.page' 
import { Tab3Page } from '../tab3/tab3.page'
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tab1 = Tab1Page
  tab2 = Tab2Page

  config:any = {
    sideMenu: 'left',
    shortSwipeDuration: 2000,
  };

  swipeable:any 
  constructor() {
    this.swipeable = false
  }

  tabChange(e){
    // console.log(e)
  }
  activeTabIndexChange(e){
    console.log(e)
  }
}
