import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page,
    children:[
      {
        path: 'tracking',
        loadChildren: () => import('../mytacking/mytacking.module').then( m => m.MytackingPageModule)
      },
      {
        path: 'me',
        loadChildren: () => import('../trackingme/trackingme.module').then( m => m.TrackingmePageModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('../request/request.module').then( m => m.RequestPageModule)
      },
      {
        path: '',
        redirectTo: "tracking",
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
