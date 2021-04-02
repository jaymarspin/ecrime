import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingmePageRoutingModule } from './trackingme-routing.module';

import { TrackingmePage } from './trackingme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingmePageRoutingModule
  ],
  declarations: [TrackingmePage]
})
export class TrackingmePageModule {}
