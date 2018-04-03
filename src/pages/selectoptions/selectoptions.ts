import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



import { Service } from './../../providers/service';

/**
 * Generated class for the SelectoptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectoptions',
  templateUrl: 'selectoptions.html',
})
export class SelectoptionsPage {
  public prodotto: any = "";
  public opzioni;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public service: Service) {
    this.prodotto = this.navParams.get('prodotto');
    service.getOpzioni(this.prodotto.id).subscribe(
    (data : any) =>
    {
       console.log('Opzioni : ', data._body);
       this.opzioni = JSON.parse(data._body);
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('item selezionato : ', this.navParams.get('prodotto').Descrizione);
  }

}
