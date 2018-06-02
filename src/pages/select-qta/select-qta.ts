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
        if(this.qta > 0){
            this.service.ordina(this.prodotto, [], this.qta).subscribe(
                (data : any) => {
                    let buttons: any = [
                        {
                          text: 'OK',
                          handler: () => {
                            this.navCtrl.pop();
                          }
                        }
                    ];
                    this.presentAlert(JSON.parse(data._body).message, buttons);
                },
                (error : any) => {
                console.dir(error);
                }
            );
        }
  }

  presentAlert(_text, _btns) {
        let alert = this.alertCtrl.create({
        title: '',
        subTitle: _text ,
        buttons: _btns
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
