import { Component } from '@angular/core';
import { HTTPTestService } from './httpservice';
import { OnInit } from '@angular/core';
import { SebmGoogleMapCircle } from 'angular2-google-maps/core';


@Component({
  selector: 'app-root',
  
  templateUrl: 'app/app.component.html',
  providers : [HTTPTestService]
  //styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit
{
  public route : any[];

  public stopPointsInRadius : any[];

  public circle : simplecircle; 

  ngOnInit () : void 
  {
      this.circle = new simplecircle();
      this.circle.radius = 300;
      this.circle.visible = false;
  }

  getRoute(naptanId : string)
  {
      this.route = new Array();
      this.httpservice.getList(naptanId).subscribe
      (
          data => 
          {
            for (var i = 0; i < data.length; i ++)
            {
              this.route[i] = JSON.parse(data[i].lineString)[0];
            }
          },
          error => console.log(<any> error)
      );
      console.log(this.httpservice.url);
  }

  constructor (private httpservice : HTTPTestService){}

  getStops()
  {
    this.stopPointsInRadius = new Array();
    console.log(this.circle);
      this.httpservice.getStops
        (
          this.circle.latitude, 
          this.circle.longitude,
          this.circle.radius
        ).subscribe
        (
          data =>
          {
            this.stopPointsInRadius = data.stopPoints;
            console.log(this.stopPointsInRadius);
          },
          error => console.log(<any> error)
        )
  }

  changeRadius ($event : any)
  {
      this.circle.radius = Math.round($event);
      this.getStops();
  }

  mapClicked($event : any)
  {
    this.route = [];
    this.circle.latitude = $event.coords.lat;
    this.circle.longitude = $event.coords.lng;
    this.circle.visible = true;
    this.getStops();
  }

  markerClicked(naptanId : string)
  {
    this.route = [];
    var stpoint;
    this.stopPointsInRadius.forEach
      ( 
        point => 
        {
          if(point.naptanId == naptanId) stpoint = point;
        }
      );
    this.stopPointsInRadius = [];
    this.stopPointsInRadius.push(stpoint);
    console.log(this.stopPointsInRadius);
    this.getRoute(naptanId);
    this.circle.visible = false;
  }

  title: string = 'My first angular2-google-maps project';
  lat: number = 51.5;
  lng: number = -0.05;
  zoom: number = 11;
}

export class simplecircle
{
    public latitude : number
    public longitude :number;
    public radius : number;
    public visible : boolean;
}