import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MytackingPage } from './mytacking.page';

const routes: Routes = [
  {
    path: '',
    component: MytackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MytackingPageRoutingModule {}
