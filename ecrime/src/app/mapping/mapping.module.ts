import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MappingPageRoutingModule } from './mapping-routing.module';

import { MappingPage } from './mapping.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MappingPageRoutingModule,
    LeafletModule
  ],
  declarations: [MappingPage]
})
export class MappingPageModule {}
