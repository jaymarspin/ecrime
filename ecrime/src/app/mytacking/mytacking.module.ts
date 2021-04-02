import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytackingPageRoutingModule } from './mytacking-routing.module';

import { MytackingPage } from './mytacking.page';
  
import {AddtrackComponent} from '../addtrack/addtrack.component'
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytackingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MytackingPage,AddtrackComponent]
  
})
export class MytackingPageModule {}
