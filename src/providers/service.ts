import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { Platform } from 'ionic-angular';

@Injectable()
export class Service {
    public SERVICE_BASE_URL = "../assets/data";

    constructor(private platform: Platform, private http: Http, private requestOptions: RequestOptions) {
    }

    public getProdotti() : Observable<any> {
        let serviceUrl: string = this.SERVICE_BASE_URL + "/prodotti.json";
        console.log("serviceUrl => " + serviceUrl);
        return this.callService(serviceUrl, true);
    }

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