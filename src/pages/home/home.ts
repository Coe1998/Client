import { Component } from '@angular/core';
import { NavController, App, AlertController, Platform } from 'ionic-angular';

import { Service } from './../../providers/service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public isApp :boolean;
  constructor(public navCtrl: NavController, public service: Service, public barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, public platform: Platform) {
    // BROWSER TESTING
    //this.getTavolo(1);
    //this.navCtrl.push(MenuPage);
    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } 
    else {
      this.isApp = true;
    }
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled){
        if(barcodeData.format == 'QR_CODE') {
          if(this.isJson(barcodeData.text)){
            let obj = JSON.parse(barcodeData.text);
            if(obj.tag == "myBarTableToken"){
              this.getTavolo(obj.id);
            }
            else {
              this.presentAlert("Errore! \nil QRcode non è valido.", ['OK COLPA MIA']);              
            }
          }
          else {
            this.presentAlert("Errore! \nil QRcode non è valido.", ['OK COLPA MIA']);
          }
        }
        else {
          this.presentAlert("Barcode non funzionante", ['OK COLPA MIA']);
        }
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  presentAlert(_sub, _btns) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: _sub ,
      buttons: _btns
    });
    alert.present();
}

  goto(){
    this.getTavolo(1);
  }

  getTavolo(_scanned){//#1
    this.service.getTavolo(_scanned).subscribe(
      (data: any) => {
        if(JSON.parse(data._body).length > 0){
          this.service.tavolo = JSON.parse(data._body)[0];
          //console.log('tavolo > ', this.service.tavolo);

          this.getLastID();
        }
        else {
          console.log('IN CHE CAZZO DI TAVOLO SEI');
        }
      },
      (error : any) => {
        console.log(error);
      }
    );
  }

  getLastID(){//#2
    this.service.getLastID('TestataOrdini').subscribe(
      (data: any) => {
        if(JSON.parse(data._body).length == 0){//se nella tabella non ci sono righe, si inizia con l'id 1
          this.service.idTestata = 1;
        }
        else {
          this.service.idTestata = JSON.parse(data._body)[0].id + 1;
        }
        this.createTestataOrdine();        
      },
      (error : any) => {
        console.log(error);
      }
    );
  }

  createTestataOrdine(){//#3
    this.service.createTestataOrdine().subscribe(
      (data: any) => {
        console.log('create-testata-ordine', JSON.parse(data._body));
        this.navCtrl.push(MenuPage);        
      },
      (error : any) => {
        console.log(error);
      }
    );
  }
}
