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
        if(this.optionsIndex[i].qta  < 1 && this.optionsIndex[i].choosen)
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
        if(this.isThereAnyOption()){
            this.service.ordina(this.prodotto, this.optionsIndex, 0).subscribe(
                (data : any) => {
                    let res = JSON.parse(data._body);
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

    isThereAnyOption(): boolean{
        let esito :boolean = false;
        this.optionsIndex.forEach(item => {
            if(item.choosen)
                esito = true;
        });
        return esito;
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
