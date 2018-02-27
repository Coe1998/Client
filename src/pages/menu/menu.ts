import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public prodotti:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service) {
    /*
    service.getProdotti().subscribe(
      response =>{
        this.prodotti = response.data;
        console.log(this.prodotti);
      },
      error =>{
        console.log("ERRORE\n", error);
      }
    );
    */
    service.getProdottiPhp()
    .subscribe((data : any) =>
    {
       console.log(JSON.parse(data._body));
       this.prodotti = JSON.parse(data._body);
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
