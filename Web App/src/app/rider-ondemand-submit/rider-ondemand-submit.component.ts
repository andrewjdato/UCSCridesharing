import { Component, ElementRef,NgModule,NgZone,ViewChild, OnInit } from '@angular/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import { FormControl,FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { DirectionsMapDirectiver } from 'app/map/google-mapRider.directive';
import {riderodServ} from "../_services/riderOnDemand.service"
import {Riderondemand} from '../_riderondemand/riderod'
import { AuthService } from '../_services/auth.service';
import {Observable} from 'rxjs/Rx';
import { User } from '../_user/user';
import {Driverondemand} from "../_driverondemand/driverod";
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
  //public destinationWaypoint: FormControl;
  public iconurl: string;
  public mapCustomStyles: any;
  public estimatedTime: any;
  public estimatedDistance: any;
  public destid: string;
  public originid: string;
  public riderx: Riderondemand;


  public driverx: Driverondemand;
  //used to poll the server
  public polling:any;
  public reqpoll:any;
  //flag to show a driver found
  public driverfound:boolean;
  //flag for pairing
  public paired:boolean;

  public reqResponse:string;

  private curUser: User;


  //
  @ViewChild("search")
  public searchElementRef: ElementRef;

  //
  @ViewChild("pickupInput")
  public pickupInputElementRef: ElementRef;

  @ViewChild("pickupOutput")
  public pickupOutputElementRef: ElementRef;

  // @ViewChild("waypoint")
  // public waypointElementRef: ElementRef;

  @ViewChild("scrollMe")
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapDirectiver) vc: DirectionsMapDirectiver;
  //
  public origin: any; // its a example aleatory position
  public destination: any; // its a example aleatory position
  constructor(private mapsAPILoader: MapsAPILoader,
              private riderodx: riderodServ,
              private ngZone: NgZone) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    //set google maps defaults
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //this.iconurl = '../image/map-icon.png';
    this.iconurl = '../image/map-icon.png';

    //initialize driverfound to false because no driver is found
    //at initialization
    this.driverfound =false;
    this.paired=false;

    //set the current riderx email
    this.riderx = {
      riderod_email: this.curUser.email,
      riderod_destination: null,
      riderod_departure: null
    }



    // this.mapCustomStyles = this.getMapCusotmStyles();
    //create search FormControl
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();
    // this.destinationWaypoint = new FormControl();
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
      // let autocompleteWaypoint = new google.maps.places.Autocomplete(this.waypointElementRef.nativeElement, {
      //   types: ["address"]
      // });

      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(autocompleteOutput, 'DES');
      // this.setupPlaceChangedListener(autocompleteWaypoint, 'WAY');
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
        } else {
          this.vc.destination = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()}; // its a example aleatory position
          this.vc.destinationPlaceId = place.place_id;}
        // } else if (mode === 'WAY') {
        //   this.vc.waypoints = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()};
        //   this.vc.waypointsPlaceId = place.place_id;
        // }

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
    this.destid = this.vc.destinationPlaceId;
    this.originid = this.vc.originPlaceId;
    this.riderx.riderod_departure = this.vc.originPlaceId;
    this.riderx.riderod_destination = this.vc.destinationPlaceId;

  }

  activateRider() {


    this.riderodx.activateR(this.riderx).subscribe(
       data =>{
         console.log("Success");
         //starts the polling to check for drivers
         this.setPolling();
       } ,
        error => {
         console.log("Error");
        }

    )

  }

  //starts the polling for finding drivers
  setPolling(){
    this.polling = Observable.interval(5000);
    return this.polling.subscribe(()=>this.findDrivers() );

  }


  //function to find drivers to request
  findDrivers(){



  this.riderodx.getDrivers().subscribe(
      data => {
        //returns the data as a driverod class in order
        //to extract information
        this.driverx = data;
        console.log(this.driverx);
        //flags to post driver info and request
        this.driverfound = true;
        //log to make sure data was returned
        console.log("Driver Found");

        //stops the polling
        //this.polling.unsubscribe();

  },
      error => {
        console.log("Driver Get Error");

    }

  )


  }

  //function to send request to driver
  riderRequest(){
    console.log(this.riderx);
    this.driverx.driverod_email = "od2@ucsc.edu";
    console.log(this.driverx.driverod_email);
    this.riderodx.sendRequest(this.riderx,this.driverx.driverod_email).subscribe(
      data =>{
        console.log("Rider Send Request Success");

        //begin polling for driver response to request
        this.pollResponse()


      },
          error =>{
        console.log("Rider Send Request Error");

          })
    


    }

    //this starts polling for a response
    pollResponse(){

    this.reqpoll = Observable.interval(5000);
    return this.reqpoll.subscribe(()=>this.getResponse());
    }

    //function getResponse will keep checking with the server until response is given
    getResponse(){

      this.riderodx.getResponse(this.riderx.riderod_email).subscribe(
          data => {
            this.reqResponse=data;
            //log to make sure data was returned
            console.log("Response get success");
            this.paired = true;
            //stops the polling for responses
            this.reqpoll.unsubscribe();

          },
          error => {
            console.log("Response get error");
            

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
