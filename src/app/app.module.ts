import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from './../pages/menu/menu';
import { SelectoptionsPage } from './../pages/selectoptions/selectoptions';
import { SelectQtaPage } from './../pages/select-qta/select-qta';
import { RiepilogoPage } from '../pages/riepilogo/riepilogo';

import { Service } from './../providers/service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    SelectoptionsPage,
    SelectQtaPage,
    RiepilogoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    SelectoptionsPage,
    SelectQtaPage,
    RiepilogoPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Service,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
