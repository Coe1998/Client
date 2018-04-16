import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { Service } from './../../providers/service';

import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public service: Service) {
    this.getTavolo();
    this.navCtrl.push(MenuPage);
  }

  getTavolo(){//#1
    this.service.getTavolo(1).subscribe(
      (data: any) => {
        if(JSON.parse(data._body).length > 0){
          this.service.tavolo = JSON.parse(data._body)[0];
          //console.log('tavolo > ', this.service.tavolo);

          this.getLastID();
        }
        else {
          console.log('IN CHE CAZZO DI TAVOLO SEI');
        }
      },
      (error : any) => {
        console.log(error);
      }
    );
  }

  getLastID(){//#2
    this.service.getLastID('TestataOrdini').subscribe(
      (data: any) => {
        if(JSON.parse(data._body).length == 0){//se nella tabella non ci sono righe, si inizia con l'id 1
          this.service.idTestata = 1;
        }
        else {
          this.service.idTestata = JSON.parse(data._body)[0].id + 1;
        }
        this.createTestataOrdine();        
      },
      (error : any) => {
        console.log(error);
      }
    );
  }

  createTestataOrdine(){//#3
    this.service.createTestataOrdine().subscribe(
      (data: any) => {
        console.log('create-testata-ordine', JSON.parse(data._body));
      },
      (error : any) => {
        console.log(error);
      }
    );
  }
}
