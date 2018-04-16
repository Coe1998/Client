import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
public optionsIndex: {'id' : number, 'choosen' : boolean}[] = new Array<{'id' : number, 'choosen' : boolean}>();

constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public service: Service) {
    this.prodotto = this.navParams.get('prodotto');
    service.getOpzioni(this.prodotto.id).subscribe(
    (data : any) =>
    {
        this.opzioni = JSON.parse(data._body);
        if(this.opzioni.length < 1)
            this.hasOpt = false;
        else {
            this.opzioni.forEach(item => {
            this.optionsIndex.push({'id': item.id, 'choosen' : false});
            });
        }
    },
    (error : any) =>
    {
    console.dir(error);
    });
}

setChoice(i){
    if(this.optionsIndex.length > 0)
    this.optionsIndex[i].choosen = !this.optionsIndex[i].choosen;
}

ordina(){
    this.service.ordina(this.prodotto.id, this.optionsIndex).subscribe(
        (data : any) =>
        {
          alert(data._body)
        },
        (error : any) =>
        {
          console.dir(error);
        }
      );
    //console.log('opzioni', this.opzioni);
    //console.log('opzioni con index', this.optionsIndex);
}

closeModal(){
    this.viewCtrl.dismiss();
}

ionViewDidLoad() {
    console.log('item selezionato : ', this.navParams.get('prodotto').Descrizione);
}

}
