import { Component, ElementRef,NgModule,NgZone,ViewChild, OnInit } from '@angular/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import { FormControl,FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from 'app/map/google-map.directive';
declare var google: any;
declare var jQuery:any;

@Component({
  selector: 'app-driver-ondemand-submit',
  //templateUrl: './driver-ondemand-submit.component.html',
  styleUrls: ['./driver-ondemand-submit.component.css'],
  providers: [GoogleMapsAPIWrapper],
  template:` <div class="container">
  <h1 class="text-center">Driver On Demand</h1>
  <div class= "text-center">

  <a routerLink="/drivertype" class="btn btn-default">Submit</a> <br>
      </div>
  <div class= "text-left">
  <a routerLink="/drivertype" class="btn btn-default">Back</a> <br>
      </div>

  <div class="form-group">
    <input placeholder="Enter source location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #pickupInput [formControl] = "destinationInput">
    <input placeholder="Enter destination" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #pickupOutput [formControl] = "destinationOutput" >
    <input placeholder="Waypoints" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #waypoint [formControl] = "destinationWaypoint" >
    <!--<input placeholder="Enter location of extra marker" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #waypoint [formControl]="destinationWaypoint" >
    -->
    </div>



    <!Google Maps HTML Code>
<sebm-google-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom" [styles]="mapCustomStyles">
 <sebm-google-map-marker [latitude]="latitude" [longitude]="longitude" [iconUrl]="iconurl">
</sebm-google-map-marker>
<sebm-google-map-directions [origin]="origin" [destination]="destination"></sebm-google-map-directions>
    </sebm-google-map>

    </div> 
 
 <div >
 <button class="btn btn-primary">Post Ride</button>
 </div>
    <div></div>
    <div *ngIf = "true">Estimated time of route: {{this.vc.estimatedTime}} </div>
    <div *ngIf = "true">Estimated distance of route: {{this.vc.estimatedDistance}} </div>
    <div *ngIf = "true">Placeid A: {{this.vc.waypointsPlaceId}} </div>
`})

export class DriverOndemandSubmitComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  //
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public destinationWaypoint: FormControl;
  public iconurl: string;
  public mapCustomStyles: any;
  public estimatedTime: any;
  public estimatedDistance: any;

  //
  @ViewChild("search")
  public searchElementRef: ElementRef;

  //
  @ViewChild("pickupInput")
  public pickupInputElementRef: ElementRef;

  @ViewChild("pickupOutput")
  public pickupOutputElementRef: ElementRef;

  @ViewChild("waypoint")
  public waypointElementRef: ElementRef;

  @ViewChild("scrollMe")
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
  //
  public origin: any; // its a example aleatory position
  public destination: any; // its a example aleatory position
  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              //private gmapsApi: GoogleMapsAPIWrapper,
              //private _elementRef : ElementRef
  ) {
  }

  ngOnInit() {
    //set google maps defaults
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //this.iconurl = '../image/map-icon.png';
    this.iconurl = '../image/map-icon.png';

    // this.mapCustomStyles = this.getMapCusotmStyles();
    //create search FormControl
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();
    this.destinationWaypoint = new FormControl();
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      //autocomplete gets the information from the inputs in the html code
      let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ["address"]
      });

      let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ["address"]
      });
      let autocompleteWaypoint = new google.maps.places.Autocomplete(this.waypointElementRef.nativeElement, {
        types: ["address"]
      });

      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(autocompleteOutput, 'DES');
      this.setupPlaceChangedListener(autocompleteWaypoint,'WAY');
    });






  }

//setupPlaceChangedListner
  private setupPlaceChangedListener(autocomplete: any, mode: any) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place = google.maps.places.PlaceResult = autocomplete.getPlace();
        //verify result
        if (place.geometry === undefined) {
          return;
        }
        if (mode === 'ORG') {
          this.vc.origin = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()};
          this.vc.originPlaceId = place.place_id;
        } else if(mode ==='DES'){
          this.vc.destination = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()}; // its a example aleatory position
          this.vc.destinationPlaceId = place.place_id;
        } else if(mode === 'WAY'){
          this.vc.waypoints = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()};
          this.vc.waypointsPlaceId = place.place_id;
        }

        if (this.vc.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }

        //Update the directions
        this.vc.updateDirections();
        this.getDistanceAndDuration();
        this.zoom = 12;
      });

    });

  }

  getDistanceAndDuration() {
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
  }

  scrollToBottom(): void {
    jQuery('html, body').animate({scrollTop: jQuery(document).height()}, 3000);
  }

  private setPickUpLocation(place: any) {
    //verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    //set latitude, longitude and zoom
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 12;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });

    }
  }

  private getMapCusotmStyles() {
    // Write your Google Map Custom Style Code Here.
  }
}