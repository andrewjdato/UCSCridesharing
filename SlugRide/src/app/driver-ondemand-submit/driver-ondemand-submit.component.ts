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
  templateUrl: './driver-ondemand-submit.component.html',
  styleUrls: ['./driver-ondemand-submit.component.css'],
  providers: [GoogleMapsAPIWrapper]
})

export class DriverOndemandSubmitComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  //
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
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
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ["address"]
      });

      let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ["address"]
      });

      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(autocompleteOutput, 'DES');
    });
  }


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
          this.vc.destinationPlaceId = place.place_id;
        }

        if (this.vc.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }

        //Update the directions
        this.vc.updateDirections();
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