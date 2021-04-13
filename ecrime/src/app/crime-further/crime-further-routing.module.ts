import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrimeFurtherPage } from './crime-further.page';

const routes: Routes = [
  {
    path: '',
    component: CrimeFurtherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrimeFurtherPageRoutingModule {}
