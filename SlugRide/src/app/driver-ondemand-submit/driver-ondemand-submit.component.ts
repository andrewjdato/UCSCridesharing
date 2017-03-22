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
  constructor(private mapsAPILoader: MapsAPILoader,
              private driverodx: driverodServ,
              private ngZone: NgZone
              ) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
  }

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
      driverod_email: this.curUser.email,
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

    //flag to activate rider goes high
    this.activate = true;

    this.driverodx.driverodPost(this.driverx).subscribe(
        data =>{
          console.log("Success");
          //starts the function to begin polling for rider requests
          this.setRiderint();
        },
        error =>{
          console.log("Error");
          //this.setRiderint();
       }
    )

  }

  //setriderint will start the polling in order to continously check for new rider requests
  setRiderint(){

    //sets interval for get request in order to keep checking for rider requests
    this.polling = Observable.interval(5000);
    return this.polling.subscribe(()=>this.checkRequests());

    //checkRequests is the function that keeps checking for rider info
    //once it has gotten rider info then a flag will be set high and the intervals will stop
    // function checkRequests(){
    //
    //     console.log("checking requests");
    //
    //     //riderx becomes the object that we receive from the server
    //      this.driverodx.driverodRequestr().subscribe(
    //         data => {
    //           //gets the data and puts it into our riderx variable
    //           this.riderx = data;
    //           //flag goes high for driver round
    //           this.flagreqR = 1;
    //           //stop intervals, after pairing works polling should continue
    //           this.polling.unsubscribe();
    //           console.log("Rider Request Received");
    //           //boolean to show reject button on webpage
    //           this.showReject = true;
    //
    //         },
    //         error => {
    //
    //           console.log("Check Request Error");
    //         }
    //     )
    //
    //
    // }




  }

  //checkrequests is the function that is being continously called in order to check new requests
  checkRequests(){

    //console to check if function is being executed
    //console.log("checking requests");

    //riderx becomes the object that we receive from the server

    this.driverodx.driverodRequestr(this.driverx.driverod_email).subscribe(


        data => {
          //gets the data and puts it into our riderx variable
          this.riderx = data;

          //flag goes high for driver round
          this.flagreqR = 1;
          //stop intervals, after pairing works polling should continue
          //this.polling.unsubscribe();
          console.log("Rider Request Received");
          //check to see if the the correct rider function is received
          //console.log(this.riderx.riderod_email.toString());
          //boolean to show reject button on webpage
          this.showReject = true;

        },
        error => {

          console.log("Check Request Error");

        }
    );




  }


  //deactivates drivers search for riders
  deactivate(){
    this.activate =false;
    this.driverodx.deactivateDriver().subscribe(
        data =>{
          console.log("Success");
          //starts the function to begin polling for rider requests
          this.setRiderint();
        },
        error =>{
          console.log("Error");}
    )

  }

  getEmail(){

    console.log(this.driverx.driverod_email.toString());


  }

  accRider(){
    this.paired=true;
    //sends the accept rider request with current driver email, rider who has requested email, and the string accept
    this.driverodx.acceptRider(this.driverx.driverod_email,this.riderx.riderod_email, "accept").subscribe(
        data => {

          //get the waypoint from rider and set for google  maps

          console.log(data);
          console.log("Accept Rider Success");
          //boolean to show reject button on webpage
          this.setRiderwypt();

        },
        error => {
          console.log(error);
          console.log("Accept Rider Error");
        }
    )

  }
  rejRider(){
//sends the accept rider request with current driver email, rider who has requested email, and the string reject
    this.driverodx.rejectRider(this.driverx.driverod_email,this.riderx.riderod_email, "reject").subscribe(
        data => {


          console.log("Reject Rider Success");
          //boolean to show reject button on webpage


        },
        error => {

          console.log("Reject Rider Error");
        }
    )

  }
  //this function will be called when the rider request is accepted
  //functin will take the rider origin and place it in the waypoint so that it is processed for the maps
  setRiderwypt(){

    //changes the waypoint from the map to the riders origin
    this.vc.waypointsPlaceId = this.riderx.riderod_departure;
    this.vc.updateDirections();


  }

  //tester for observable.interval()
  testerf(){

    //test to see if waypoints will change, does it work?: WORKING
    this.vc.waypointsPlaceId = "ChIJn-xda51qjoARwck5kd8IRRA";
    this.vc.updateDirections();



    // this.a++;
    //
    // this.myvar1 = Observable.interval(5000);
    // return this.myvar1.subscribe(()=> this.add());


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