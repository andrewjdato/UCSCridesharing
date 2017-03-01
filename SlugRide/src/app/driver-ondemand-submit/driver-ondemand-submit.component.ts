import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-ondemand-submit',
  templateUrl: './driver-ondemand-submit.component.html',
  styleUrls: ['./driver-ondemand-submit.component.css']
})
export class DriverOndemandSubmitComponent implements OnInit {
  title: string = "Google Maps";
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
