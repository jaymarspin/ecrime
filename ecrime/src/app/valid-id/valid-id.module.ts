import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidIDPageRoutingModule } from './valid-id-routing.module';

import { ValidIDPage } from './valid-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidIDPageRoutingModule
  ],
  declarations: [ValidIDPage]
})
export class ValidIDPageModule {}
