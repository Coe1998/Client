import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
  selector: 'page-riepilogo',
  templateUrl: 'riepilogo.html',
})
export class RiepilogoPage {
  public ordine;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiepilogoPage');
  }

  deleteProdotto(_tem){
    console.log('delete');
  }

}
