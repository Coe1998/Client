import { SelectQtaPage } from './../select-qta/select-qta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { SelectoptionsPage } from './../selectoptions/selectoptions';
import { RiepilogoPage } from '../riepilogo/riepilogo';
import { HomePage } from '../home/home';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public prodotti: Prodotti[];
  public categorie: Categorie[]
  public hasOptList: any;
  public ctrl: boolean;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public service: Service, public alertCtrl: AlertController) {
    this.prodotti = new Array<Prodotti>();
    this.categorie = new Array<Categorie>();
    this.ctrl = true;
  }

  ionViewDidLoad() {
    if(this.ctrl) {
      this.retrieve_categorie();
      this.retrieve_prodotti(1);
      this.retrieve_hasOpt();
      this.ctrl = false;
    }
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
     this.modalCtrl.create(SelectQtaPage, {"prodotto" : item}).present();
  }

  openRiepilogo() {
    this.navCtrl.push(RiepilogoPage);
  }

  presentAlert(_subT, _btns) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: _subT ,
      buttons: _btns
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

  backHomePage(){
    let buttons: any = [
      {
        text: 'Indietro',
        handler: () => {
          this.navCtrl.popToRoot();
        }
      },
      {
        text: 'Resta',
        role: 'cancel',
        handler: () => {
        }
      }
    ];
    this.presentAlert("Sei sicuro di voler tornare indietro? l'ordine che stai facendo verrà eliminato", buttons);
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