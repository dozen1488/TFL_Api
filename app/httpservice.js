"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/throw');
// Operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/toPromise');
var HTTPTestService = (function () {
    function HTTPTestService(http) {
        this.http = http;
        this.AppId = '0dfc5e31';
        this.AppKey = 'c521f0cba5f1df95262837ec9d9a9868';
        this.ApiUrl = 'https://api.tfl.gov.uk';
        this.ApiMethod = 'StopPoint';
    }
    HTTPTestService.prototype.getRoutes = function (LineID) {
        this.url = this.ApiUrl +
            '/' + this.ApiMethod +
            '/' + LineID +
            '/' + 'Route' +
            '?' + 'app_id=' + this.AppId +
            '&app_key=' + this.AppKey;
        console.log(this.url);
        return this.http.get(this.url).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    HTTPTestService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    HTTPTestService.prototype.getStops = function (lat, lng, radius) {
        this.url = this.ApiUrl +
            '/' + this.ApiMethod +
            '?lat=' + lat +
            '&lon=' + lng +
            '&stopTypes=NaptanPublicBusCoachTram&radius=' + radius +
            '&useStopPointHierarchy=True&returnLines=True&' +
            'app_id=' + this.AppId +
            '&app_key=' + this.AppKey;
        console.log(this.url);
        return this.http.get(this.url).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    HTTPTestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPTestService);
    return HTTPTestService;
}());
exports.HTTPTestService = HTTPTestService;
//# sourceMappingURL=httpservice.js.map