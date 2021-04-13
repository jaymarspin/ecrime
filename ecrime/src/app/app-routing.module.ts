import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    // loadChildren: () => import('./valid-id/valid-id.module').then( m => m.ValidIDPageModule)
    // loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
    // loadChildren: () => import('./selfie/selfie.module').then( m => m.SelfiePageModule)
    // loadChildren: () => import('./selfie/selfie.module').then( m => m.SelfiePageModule)
    // loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
    redirectTo: "splash",
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'selfie',
    loadChildren: () => import('./selfie/selfie.module').then( m => m.SelfiePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'validid',
    loadChildren: () => import('./valid-id/valid-id.module').then( m => m.ValidIDPageModule)
  },
  {
    path: 'approval',
    loadChildren: () => import('./approval/approval.module').then( m => m.ApprovalPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'mytacking',
    loadChildren: () => import('./mytacking/mytacking.module').then( m => m.MytackingPageModule)
  },
  {
    path: 'trackingme',
    loadChildren: () => import('./trackingme/trackingme.module').then( m => m.TrackingmePageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'mapping',
    loadChildren: () => import('./mapping/mapping.module').then( m => m.MappingPageModule)
  },
  {
    path: 'crime-further',
    loadChildren: () => import('./crime-further/crime-further.module').then( m => m.CrimeFurtherPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
