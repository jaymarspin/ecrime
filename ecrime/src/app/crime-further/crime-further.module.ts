import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrimeFurtherPageRoutingModule } from './crime-further-routing.module';

import { CrimeFurtherPage } from './crime-further.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrimeFurtherPageRoutingModule
  ],
  declarations: [CrimeFurtherPage]
})
export class CrimeFurtherPageModule {}
