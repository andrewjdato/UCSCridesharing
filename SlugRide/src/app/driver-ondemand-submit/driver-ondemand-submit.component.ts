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

@Component({
  selector: 'app-driver-ondemand-submit',
  templateUrl: './driver-ondemand-submit.component.html',
  styleUrls: ['./driver-ondemand-submit.component.css'],
  providers: [GoogleMapsAPIWrapper]
})

export class DriverOndemandSubmitComponent implements OnInit {
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

  private curUser: User;

  //boolean to show text lines for estimated time and distance
  public showinfo: boolean;
  //paired is the true or false of a pairing, by default it is false
  public paired: boolean;
  //boolean to show if there is a current rider
  public showReject: boolean;

  //driverx is an instance of the driverod class
  public driverx: Driverondemand;
  //flag will tell us when we receive rider info
  public flagreqR: number;
  //driverodx is an instance of driverodServ where we are able to use its functions
  //public driverodx: driverodServ;
  //variables for intervals in functions
  public myvar1: any;
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
  constructor(private mapsAPILoader: MapsAPILoader,
              private driverodx: driverodServ,
              private ngZone: NgZone
              ) {}

  ngOnInit() {
    //test for observable
    //let timer = Observable.interval(1000).subscribe(()=>this.add());

    //set google maps defaults
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.a=12;
    //this.iconurl = '../image/map-icon.png';
    this.iconurl = '../image/map-icon.png';
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
        this.getPlaceid();
        this.getEmail();
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

  //formats data to be sent to server, such as origin place id, destination place id
  driverodSend() {


    this.driverodx.driverodPost(this.driverx).subscribe(
        data =>{
          console.log("Success");
          //starts the function to begin polling for rider requests
          this.setRiderint();
        },
        error =>{
          console.log("Error");
       }
    )

  }

  //CAN THIS= MULTITHREAD!???: no
  setRiderint(){

    //sets interval for get request in order to keep checking for rider waypoint

    this.polling = Observable.interval(5000);
    return this.polling.subscribe(()=>getRiderinfo());

    //getRiderinfo is the function that keeps checking for rider info
    //once it has gotten rider info then a flag will be set high and the intervals will stop
    function getRiderinfo(){
      //while(this.flagreqR === 0){


        //riderx becomes the object that we receive from the server
        this.riderx = this.driverodx.driverodRequestr().subscribe(
            data => {

              //flag goes high for driver round
              this.flagreqR = 1;
              //stop intervals
              this.polling.unsubscribe();
              console.log("Success");
              //boolean to show reject button on webpage
              this.showReject = true;

            },
            error => {

              console.log("Error");
            }
        )

      //}

    }



  }


  //deactivates drivers search for riders
  // deactivate(){
  //   this.driverodx.deactivateDriver().subscribe(
  //       data =>{
  //         console.log("Success");
  //         //starts the function to begin polling for rider requests
  //         this.setRiderint();
  //       },
  //       error =>{
  //         console.log("Error");}
  //   )
  //
  // }

  getEmail(){
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.driverx.driverod_email = this.curUser.email;

  }

  accRider(){
    this.driverodx.acceptRider().subscribe(
        data => {


          console.log("Success");
          //boolean to show reject button on webpage


        },
        error => {

          console.log("Error");
        }
    )
  }

  //tester for observable.interval()
  testerf(){
    this.a++;




    this.myvar1 = Observable.interval(5000);
    return this.myvar1.subscribe(()=> this.add());







  }
   add(){
  this.a++;
     clearInterval(this.myvar1);
  // this.testerf().remove(myvar1)
     if(this.a>15) {
      this.myvar1.unsubsribe();

     }

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