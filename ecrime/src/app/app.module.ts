import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpModule} from '@angular/http';
import { HttpClient,HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,SuperTabsModule.forRoot(), IonicModule.forRoot(), AppRoutingModule,HttpModule,HttpClientModule],
  providers: [Camera,HttpClient,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}
