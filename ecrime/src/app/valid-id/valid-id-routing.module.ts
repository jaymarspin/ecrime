import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidIDPage } from './valid-id.page';

const routes: Routes = [
  {
    path: '',
    component: ValidIDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidIDPageRoutingModule {}
