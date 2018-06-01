import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
  selector: 'page-riepilogo',
  templateUrl: 'riepilogo.html',
})
export class RiepilogoPage {
  public ordine: RigaOrdine[] = new Array<RigaOrdine>();
  public totaleOrdine: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service, public alertCtrl: AlertController) {
      this.retrieve_righe_ordine();
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

  deleteProdotto(_idRigaOrd){
    console.log(_idRigaOrd);
    this.service.deleteRigaFromOrdine(_idRigaOrd).subscribe(
      (data: any) => {
        this.presentAlert(JSON.parse(data._body).message, ['OK']);
        this.retrieve_righe_ordine();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  alterQta(_idRigOrd, _upd, _nowQta) {
    this.service.updateQta(_idRigOrd, _upd, _nowQta).subscribe(
      (data: any) => {
        if(JSON.parse(data._body).status == 1){
          this.retrieve_righe_ordine();
        }
        else {
          this.presentAlert(JSON.parse(data._body).message, ['OK']);
        }
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
  
  confermaOrdine() {
      let buttons: any = [
      {
        text: 'Annulla',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Conferma',
        handler: () => {
          console.log('Ordine confermato');
          this.service.confermaOrdine().subscribe(
            (data: any) => {
              console.log(data);
              this.presentAlert(JSON.parse(data._body).message, ['OK']);
            },
            (error: any) => {
              console.log(error);
            }
          );
        }
      }
    ];
    this.presentAlert('Confermare l\'ordine ?', buttons);
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

  cur(a) {
    let b: string = a.toString();
    if(b[0] == '0'){
      return b.substring(2, b.length) + " €";
    }
    else 
      return b + " €";
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