import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {ReportcrimeFormComponent} from '../components/reportcrime-form/reportcrime-form.component'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public popoverController: PopoverController) {}


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ReportcrimeFormComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
