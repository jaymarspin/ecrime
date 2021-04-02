import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingmePage } from './trackingme.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingmePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingmePageRoutingModule {}
