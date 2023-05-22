import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Toast } from '@ionic-native/toast/ngx';

import { SignaturePadModule } from 'angular2-signaturepad';
import { Camera } from '@ionic-native/Camera/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
	  BrowserModule, 
	  IonicModule.forRoot(), 
	  AppRoutingModule,
	  IonicStorageModule.forRoot(), 
	  HttpClientModule,
	  FormsModule,
	  ReactiveFormsModule,
    SignaturePadModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    BarcodeScanner,
    Toast,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
