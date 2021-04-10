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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';  
import { DocumentScanner } from '@ionic-native/document-scanner/ngx/';
import { Toast } from '@ionic-native/toast/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,SuperTabsModule.forRoot(), IonicModule.forRoot(), AppRoutingModule,HttpModule,HttpClientModule,FormsModule,CommonModule,ReactiveFormsModule],
  providers: [Camera,HttpClient,
    Geolocation,Base64,
    CallNumber,
    FilePath,
    WebView,
    PhotoViewer,  
    DocumentScanner,
    Toast,
    FirebaseX
    
    ,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}
