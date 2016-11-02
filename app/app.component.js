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
var httpservice_1 = require('./httpservice');
var AppComponent = (function () {
    function AppComponent(httpservice) {
        this.httpservice = httpservice;
        this.title = 'My first angular2-google-maps project';
        this.lat = 51.5;
        this.lng = -0.05;
        this.zoom = 11;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.circle = new simplecircle();
        this.circle.radius = 300;
        this.circle.visible = false;
    };
    AppComponent.prototype.getRoute = function (naptanId) {
        var _this = this;
        this.route = new Array();
        this.httpservice.getList(naptanId).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                _this.route[i] = JSON.parse(data[i].lineString)[0];
            }
        }, function (error) { return console.log(error); });
        console.log(this.httpservice.url);
    };
    AppComponent.prototype.getStops = function () {
        var _this = this;
        this.stopPointsInRadius = new Array();
        console.log(this.circle);
        this.httpservice.getStops(this.circle.latitude, this.circle.longitude, this.circle.radius).subscribe(function (data) {
            _this.stopPointsInRadius = data.stopPoints;
            console.log(_this.stopPointsInRadius);
        }, function (error) { return console.log(error); });
    };
    AppComponent.prototype.changeRadius = function ($event) {
        this.circle.radius = Math.round($event);
        this.getStops();
    };
    AppComponent.prototype.mapClicked = function ($event) {
        this.route = [];
        this.circle.latitude = $event.coords.lat;
        this.circle.longitude = $event.coords.lng;
        this.circle.visible = true;
        this.getStops();
    };
    AppComponent.prototype.markerClicked = function (naptanId) {
        this.route = [];
        var stpoint;
        this.stopPointsInRadius.forEach(function (point) {
            if (point.naptanId == naptanId)
                stpoint = point;
        });
        this.stopPointsInRadius = [];
        this.stopPointsInRadius.push(stpoint);
        console.log(this.stopPointsInRadius);
        this.getRoute(naptanId);
        this.circle.visible = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app/app.component.html',
            providers: [httpservice_1.HTTPTestService]
        }), 
        __metadata('design:paramtypes', [httpservice_1.HTTPTestService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var simplecircle = (function () {
    function simplecircle() {
    }
    return simplecircle;
}());
exports.simplecircle = simplecircle;
//# sourceMappingURL=app.component.js.map