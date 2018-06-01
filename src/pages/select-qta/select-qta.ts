import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
  selector: 'page-select-qta',
  templateUrl: 'select-qta.html',
})
export class SelectQtaPage {
  public prodotto: any = "";
  public qta: number = 0;
    /*
     *  
     *  RICONTROLLARE QUERY ORDINA
     *  FARE UN PO' DI GRAFICA
     * 
     */

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public service: Service, public alertCtrl: AlertController) {
      this.prodotto = this.navParams.get('prodotto');
  }

  increment(){
    this.qta++;
  }

  decrement(){
    if(this.qta != 0)
        this.qta--;
  }
  
  ordina(){
      this.service.ordina(this.prodotto, [], this.qta).subscribe(
          (data : any) => {
            this.presentAlert();
          },
          (error : any) => {
            console.dir(error);
          }
      );
  }

  presentAlert() {
      let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Prodotto inserito nell\'ordine' ,
      buttons: ['OK']
      });
      alert.present();
  }

  closeModal(){
      this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
      console.log('item selezionato : ', this.navParams.get('prodotto').Descrizione);
  }

}
