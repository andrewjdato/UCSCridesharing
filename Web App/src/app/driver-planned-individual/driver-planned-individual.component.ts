import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { PlannedService } from '../_services/planned.service';

import { Component, ElementRef,NgModule,NgZone,ViewChild, OnInit } from '@angular/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import { FormControl,FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from 'app/map/google-map.directive';
import {driverodServ} from "../_services/driverOnDemand.service"
import {Driverondemand} from '../_driverondemand/driverod'
import {Riderondemand} from '../_riderondemand/riderod'
import { AuthService } from '../_services/auth.service';
import {Observable} from 'rxjs/Rx';
import { User } from '../_user/user';
declare var google: any;
declare var jQuery:any;

export class riderInfo{
    rider_email : string;
    rider_firstname : string;
    rider_lastname : string;
    rider_location : string;
    rider_destination : string;
    rider_timeofdeparture : string;
    rider_approved : boolean;
}

@Component({
  selector: 'app-driver-planned-individual',
  templateUrl: './driver-planned-individual.component.html',
  styleUrls: ['./driver-planned-individual.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class DriverPlannedIndividualComponent implements OnInit {
    currentUser: User;
    users : riderInfo[]; //change model 
    id : string;
    incorrect_submit : boolean; 
    depart : boolean;

    constructor(private userService: UserService,
                private router: Router,
                private plannedService: PlannedService,
                private mapsAPILoader: MapsAPILoader,
                private driverodx: driverodServ,
                private ngZone: NgZone) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.depart = false;
        this.incorrect_submit = false; 
        this.id = this.plannedService.getid();
        console.log(this.id);
        console.log(Array.isArray(this.users));
        this.loadAllUsers();
        
        this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.a=12;

    //this.iconurl = '../image/map-icon.png';
    this.iconurl = 'src/ionic.png';
    this.paired = false;
    this.showinfo = false;
    this.showReject = false;

    //will get user information from local storage


    // this.mapCustomStyles = this.getMapCusotmStyles();
    //create search FormControl
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();
    this.destinationWaypoint = new FormControl();
    //set current position
    this.setCurrentPosition();

    this.driverx = {
      driverod_email: 'Temp',
      driverod_departure: null ,
      driverod_destination: null
    }

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

        //console.log("check 2");
        
    }

    private loadAllUsers() {
        //Change this object
        //this.plannedService.getAllDriverRides(this.currentUser.email).subscribe(users => { this.users = users; }); 
        console.log(this.id , this.currentUser.email);
        this.plannedService.getCurrentRiders(this.currentUser.email, this.id).subscribe(users => { 
        this.users = users;
        console.log(Array.isArray(users), users)
        });
        //Change Function
        //this.plannedService.getCurrentRiders(id).subscribe(users => { this.users = users; })
    }

    approveRider(email : string, approved : boolean) {
      this.plannedService.approveRider(this.currentUser.email, email, this.id, approved) //Change second param to trip ID
                         .subscribe(
                         data => {
                            this.router.navigate(['/driverschedule']);
                         },
                         error => {
                            this.incorrect_submit = true; 
                            //Insert Notification Here
        });
    }




//Code provided by the On demand section

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public a: number;
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

  public curUser: User;

  public name: string;


  //boolean to show text lines for estimated time and distance
  public showinfo: boolean;
  //paired is the true or false of a pairing, by default it is false
  public paired: boolean;
  //boolean to show if there is a current rider
  public showReject: boolean;
  //flag when driver is activated
  public activate: boolean;

  //driverx is an instance of the driverod class
  driverx: Driverondemand;
  //flag will tell us when we receive rider info
  public flagreqR: number;
  //driverodx is an instance of driverodServ where we are able to use its functions
  //public driverodx: driverodServ;
  //variables for intervals in functions
  public myvar1: any;
  //used to poll the server
  public polling:any;
  //riderx is the instance of the rider info that we receive
  public riderx: Riderondemand;
  //rider waypoint is the placeId of the rider, will be used as a waypoint on maps
  public riderwpt: string;





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
        this.getPlaceid();

        this.zoom = 12;
      });

    });

  }


  //gets distance and duration of route
  getDistanceAndDuration() {
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;

    this.showinfo=true;
  }

  //gets the placeid of the destination and origin
  getPlaceid(){
     this.destid =this.vc.destinationPlaceId;
     this.originid = this.vc.originPlaceId;
     this.driverx.driverod_destination = this.vc.destinationPlaceId;
     this.driverx.driverod_departure = this.vc.originPlaceId;
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
        //var latlngx = new google.maps.LatLng(this.latitude,this.longitude);
        //marker.setPosition(latlngx);
        this.zoom = 12;


      });

    }
  }

  private getMapCusotmStyles() {
    // Write your Google Map Custom Style Code Here.
  }
}
