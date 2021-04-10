import { IonicModule } from '@ionic/angular';
 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import {ReportcrimeFormComponent} from '../components/reportcrime-form/reportcrime-form.component'
import {MapComponent} from '../map/map.component'
import { ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule,
    LeafletModule
     
  ],
  declarations: [Tab2Page,ReportcrimeFormComponent,MapComponent], 
}) 
export class Tab2PageModule {}
