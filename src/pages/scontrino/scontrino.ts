import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
  selector: 'page-scontrino',
  templateUrl: 'scontrino.html',
})
export class ScontrinoPage {
  public ordine: RigaOrdine[] = new Array<RigaOrdine>();
  public info: string= "";
  public totaleOrdine: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service, public alertCtrl: AlertController) {
      this.retrieve_righe_ordine();
      let interval = setInterval(() => {
        service.getStatus().subscribe(
          (data :any) => {
            console.log('stato ', JSON.parse(data._body).statoOrd);
            if(JSON.parse(data._body).statoOrd == "TRASPORTO") {
              this.info = "Il tuo oridne sta arrivando";
              this.presentAlert("Il tuo ordine sta arrivando!", ['PREGO']);
                clearInterval(interval);
            }
          }, 
          (error :any) => {
            console.log(error);
          }
        );
      }, 5000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiepilogoPage');
  }

  retrieve_righe_ordine(){
    this.service.getRigheOrdine().subscribe(
      (data: any) => {
        //console.log(data);
        this.ordine = JSON.parse(data._body);
        this.getTotale();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  getTotale() {
    this.service.getTotale().subscribe(
      (data: any) => {
        //console.log('totoale', data);
        this.totaleOrdine = JSON.parse(data._body)[0].Totale;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  presentAlert(_sub, _btns) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: _sub ,
      buttons: _btns
    });
    alert.present();
  }

}

interface RigaOrdine {
  'idRigaOrdine': number, 
  'descrizione': string, 
  'prezzo': number, 
  'idRelOrdOpz': number,
  'qta': number,
  'subtot': number
}