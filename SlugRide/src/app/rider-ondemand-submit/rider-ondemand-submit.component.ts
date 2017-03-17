import { Component, ElementRef,NgModule,NgZone,ViewChild, OnInit } from '@angular/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import { FormControl,FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from 'app/map/google-map.directive';
import {riderodServ} from "../_services/riderOnDemand.service"
import {Riderondemand} from '../_riderondemand/Riderondemand'
import { AuthService } from '../_services/auth.service';
declare var google: any;
declare var jQuery:any;

@Component({
  selector: 'app-rider-ondemand-submit',
  templateUrl: './rider-ondemand-submit.component.html',
  styleUrls: ['./rider-ondemand-submit.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class RiderOndemandSubmitComponent implements OnInit {
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
  public destid: string;
  public originid: string;
  public riderx: Riderondemand;

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
              private riderodx: riderodServ,
              private ngZone: NgZone) {
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
      this.setupPlaceChangedListener(autocompleteWaypoint, 'WAY');
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
        } else if (mode === 'DES') {
          this.vc.destination = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()}; // its a example aleatory position
          this.vc.destinationPlaceId = place.place_id;
        } else if (mode === 'WAY') {
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
        this.getPlaceid();
        this.zoom = 12;
      });

    });

  }


  //gets distance and duration of route
  getDistanceAndDuration() {
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
  }

  //gets the placeid of the destination and origin
  getPlaceid() {
    this.riderx.riderod_destination = this.destid = this.vc.destinationPlaceId;
    this.riderx.riderod_departure = this.originid = this.vc.originPlaceId;

  }

  postrider() {
    this.riderodx.riderodPost(this.riderx).subscribe(
       data =>{
         console.log("Success");
       } ,
        error => {
         console.log("Error");
        }

    )

  }


  scrollToBottom(): void {
    jQuery('html, body').animate({scrollTop: jQuery(document).height()}, 3000);
  }


  //sets latitude and longitude form google maps api
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

  //sets current position in maps from your geolocation
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
