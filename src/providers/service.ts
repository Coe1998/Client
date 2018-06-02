import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { Platform } from 'ionic-angular';

@Injectable()
export class Service {
    public tavolo: any = {};
    public testataOrdine: any = {};
    public idTestata: number;
    public SERVICE_BASE_URL = "../assets/data/";
    //private baseURI: string  = "http://localhost:8000/server.php";
    private baseURI: string = "http://mybar201718.altervista.org/php/server.php";
    constructor(private platform: Platform, private http: Http, private requestOptions: RequestOptions, public httpClient : HttpClient,) {
    }
    /*
     * PHP SERVER
     */
    public getProdotti(item: string): Observable<any> {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "retrieve-prodotti", 
            "categoria": item 
        },
        url: any = this.baseURI;
        return this.http.post(url, JSON.stringify(options), headers);
    }

    public getCategorie(): Observable<any> {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "retrieve-categorie" 
        },
        url: any = this.baseURI;
        return this.http.post(url, JSON.stringify(options), headers);
    }

    public getProdConOpz() : Observable<any>{
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "retrieve-prodotti-conopz" 
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);   
    }

    public getTavolo(_idTavolo) : Observable<any> {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "retrieve-tavolo", 
            "tavolo" : _idTavolo 
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers); 
    }

    public getLastID(_tabella) : Observable<any> {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "retrieve-ultimo-id", 
            "tabella": _tabella
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers); 
    }

    public createTestataOrdine() : Observable<any> {
        console.log('this.service.idTestata = ', this.idTestata);
        console.log('this.service.tavolo = ', this.tavolo);
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "create-testata-ordine", 
            'id-tavolo': this.tavolo.id, 
            'id-testata': this.idTestata 
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers); 
    }
    
    /*
    public insertProdottiPhp() {
        console.log('insert into prodotti');
        let prodotti = [];
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { "key" : "insert-prodotti", "prodotti" : prodotti  },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }
    */

    public getOpzioni(_idProd){
        //console.log('idProd', idProd);
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "retrieve-opzioni", 
            "prodotto" : _idProd
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    public ordina(_prod, _opts, _singleQta){
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= { 
            "key" : "add-prodotto-to-ordine", 
            "id-testata": this.idTestata, 
            "prodotto": _prod, 
            "opzioni": _opts,
            "sQta": _singleQta
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    public getRigheOrdine() {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= {
            "key" : "retrieve-righe-ordine", 
            "id-testata": this.idTestata,
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    public deleteRigaFromOrdine(_idRigOrd) {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= {
            "key" : "delete-riga-from-ordine", 
            "id-riga": _idRigOrd,
            "id-testata": this.idTestata
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    public updateQta(_idRigOrd, _upd, _nowQta){
        if(_nowQta == 0 && _upd == -1){
            return this.deleteRigaFromOrdine(_idRigOrd);
        }
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= {
            "key" : "update-qta-riga-ordine", 
            "id-riga": _idRigOrd,
            "upd": _upd,
            "id-testata": this.idTestata
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    public confermaOrdine() {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= {
            "key" : "conferma-ordine", 
            "id-testata": this.idTestata,
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    public getTotale() {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= {
            "key" : "retrieve-totale-ordine", 
            "id-testata": this.idTestata,
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    public getStatus() {
        let headers:any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options:any	= {
            "key" : "retrieve-status", 
            "id-testata": this.idTestata,
        },
        url: any = this.baseURI;

        return this.http.post(url, JSON.stringify(options), headers);
    }

    /*
     *  ordina
     *  > dalla pagina menu il parametro _opts resta a null
     *  > dalla pagine selectoptions si manda l'array di index con {id, choosen}, 
     *    valore booleano che indica se è stato scelto o meno
     *  DA PHP
     *  > se il valore di _opts è a null non entra nella if e quindi non aggiunge nulla alla
     *    tabella RelOrdiniOpzioni, altrimenti scorre tutto l'array, nel caso in cui l'indice
     *    sia marcato a true si inserisce nella tabella, associando così la riga ordini all'
     *    opzione.
     */

    private callService(serviceUrl: string, isBlocking: boolean = true): Observable<any>{
        return this.http.get(serviceUrl)
        .map(this.extractData)
        .catch(this.handleError)
        .finally(() => { 
        });
    }
    private extractData(res: Response) {
        let body = res.json();
        // return body.data || {};
        return body;
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        // const body = error.json() || '';
        // const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}