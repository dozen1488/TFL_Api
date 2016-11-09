import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HTTPTestService
{
    public AppId : string = '0dfc5e31';
    public AppKey : string = 'c521f0cba5f1df95262837ec9d9a9868';

    public ApiUrl : string = 'https://api.tfl.gov.uk';
    public ApiMethod : string = 'StopPoint';
    public url : string;

    constructor (public http : Http){}
    getRoutes( LineID : string) 
    {
        this.url = this.ApiUrl + 
        '/' + this.ApiMethod + 
        '/' + LineID + 
        '/' + 'Route' + 
        '?' + 'app_id=' + this.AppId + 
        '&app_key=' + this.AppKey;

        console.log(this.url);
        
        return this.http.get(this.url).map( res => res.json()).catch(this.handleError);
    }
    private handleError (error: Response | any)
    {
    // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) 
        {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else 
        {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getStops(lat : number , lng : number, radius : number)
    {
        this.url = this.ApiUrl + 
        '/' + this.ApiMethod + 
        '?lat=' + lat + 
        '&lon=' + lng + 
        '&stopTypes=NaptanPublicBusCoachTram&radius=' + radius + 
        '&useStopPointHierarchy=True&returnLines=True&' +
        'app_id=' + this.AppId + 
        '&app_key=' + this.AppKey;
        
        console.log(this.url);

        return this.http.get(this.url).map( res => res.json()).catch(this.handleError);
    }
}