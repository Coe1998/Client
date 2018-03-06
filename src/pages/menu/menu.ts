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
  public categorie:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service) {
    this.retrieve_categorie();
    this.retrieve_prodotti(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  retrieve_prodotti(item){
    this.service.getProdotti(item)
    .subscribe((data : any) =>
    {
       console.log(data._body);
       this.prodotti = JSON.parse(data._body);
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }

  retrieve_categorie(){
    this.service.getCategorie()
    .subscribe((data : any) =>
    {
       console.log(data._body);
       this.categorie = JSON.parse(data._body);
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }
}
