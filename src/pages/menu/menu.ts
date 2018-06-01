import { SelectQtaPage } from './../select-qta/select-qta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { SelectoptionsPage } from './../selectoptions/selectoptions';
import { RiepilogoPage } from '../riepilogo/riepilogo';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public prodotti: Prodotti[]= new Array<Prodotti>();
  public categorie: Categorie[] = new Array<Categorie>();
  public hasOptList: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public service: Service, public alertCtrl: AlertController) {
    this.retrieve_categorie();
    this.retrieve_prodotti(1);
    this.retrieve_hasOpt();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MenuPage');
  }

  retrieve_hasOpt(){
    this.service.getProdConOpz()
    .subscribe((data : any) =>
    {
			 //console.log('hasOpt',data._body);
       this.hasOptList = JSON.parse(data._body);
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }

  retrieve_prodotti(item){
    let cat :string = item;
    this.service.getProdotti(cat)
    .subscribe((data : any) =>
    {
       //console.log(data._body);
       this.prodotti = JSON.parse(data._body);
    },
    (error : any) =>
    {
      console.dir(error);
    });
  }

  retrieve_categorie(){
    this.service.getCategorie()
    .subscribe(
      (data : any) =>
      {
        //console.log(data._body);
        this.categorie = JSON.parse(data._body);
      },
      (error : any) =>
      {
        console.dir(error);
      }
    );
  }

  openSelectOption(item){
    if(this.esistonoOpzioni(item.id))
      this.modalCtrl.create(SelectoptionsPage, {"prodotto" : item}).present();
    else 
      /*
			this.service.ordina(item.id, []).subscribe(
        (data : any) => {
          this.presentAlert();
        },
        (error : any) => {
          console.dir(error);
        }
      );
      */
     this.modalCtrl.create(SelectQtaPage, {"prodotto" : item}).present();
  }

  openRiepilogo() {
    this.navCtrl.push(RiepilogoPage);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Prodotto inserito nell\'ordine' ,
      buttons: ['OK']
    });
    alert.present();
  }

  esistonoOpzioni(id){
		var esito: boolean = false;
    this.hasOptList.forEach(item => {
        if(item.id == id){
					esito = true;
        }
    });
    return esito;
  }
}


interface Categorie {
  'id': number,
  'Descrizione': string
}

interface Prodotti {
  'id': number,
  'Descrizione': string,
  'Disponibile': string[1],
  'Img': string,
  'Info': string,
  'Prezzo': string,
  'idCategoria': number

}