import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { Service } from './../../providers/service';

@IonicPage()
@Component({
    selector: 'page-selectoptions',
    templateUrl: 'selectoptions.html',
})
export class SelectoptionsPage {
    public hasOpt: boolean = true;
    public prodotto: any = "";
    public opzioni: any;
    public optionsIndex: {'id' : number, 'choosen' : boolean, 'qta': number}[] = new Array<{'id' : number, 'choosen' : boolean, 'qta': number}>();

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public service: Service, public alertCtrl: AlertController) {
        this.prodotto = this.navParams.get('prodotto');
        service.getOpzioni(this.prodotto.id).subscribe(
        (data : any) => {
            this.opzioni = JSON.parse(data._body);
            if(this.opzioni.length < 1)
                this.hasOpt = false;
            else {
                this.opzioni.forEach(item => {
                this.optionsIndex.push({'id': item.id, 'choosen' : false, 'qta': 0});
                });
            }
        },
        (error : any) => {
        console.dir(error);
        });
    }

    setChoice(i){
        this.optionsIndex[i].choosen = !this.optionsIndex[i].choosen;
        this.optionsIndex[i].qta = 0;
        if(this.optionsIndex[i].qta  < 1)
            this.optionsIndex[i].qta = 1;
    }

    increment(i){
            this.optionsIndex[i].qta++;
        if(this.optionsIndex[i].qta > 0) 
            this.optionsIndex[i].choosen = true;
    }

    decrement(i){
            if(this.optionsIndex[i].qta > 0)
                this.optionsIndex[i].qta--;
            if(this.optionsIndex[i].qta < 1)
                this.optionsIndex[i].choosen = false;                
    }
    
    showQta(i){
        return this.optionsIndex[i].qta;
    }

    ordina(){
        this.service.ordina(this.prodotto, this.optionsIndex, 0).subscribe(
            (data : any) => {
                let res = JSON.parse(data._body);
                if(res.status == 1){
                    this.presentAlert(res.message, ['OK']);
                }
                else {
                    //eventuale cambio grafica della finestra
                    this.presentAlert(res.message, ['OK']);                    
                }
            },
            (error : any) => {
            console.dir(error);
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

    closeModal(){
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        console.log('item selezionato : ', this.navParams.get('prodotto').Descrizione);
    }

}
