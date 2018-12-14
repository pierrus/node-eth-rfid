/// <reference path='../../node_modules/@types/googlemaps/index.d.ts' />

import { Component, OnInit, ViewChild } from '@angular/core';

import { RfidTrackerService } from './rfid-tracker.service';
import { TrackingEntry } from './tracking-entry';

@Component({
  selector: 'app-entries-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('googleMap') gmapElement: any;
  map: google.maps.Map;

  trackingEntries: TrackingEntry[] = [];

  constructor(private ethService: RfidTrackerService) { }

  ngOnInit() {
    window.addEventListener('load', (event) => {
      this.bootStrapMap();
    });

    this.ethService.GetTrackingEntries().subscribe(trackingEntry => { this.trackingEntries.push(trackingEntry) });
  }

  bootStrapMap(): void {
    var mapProp = {
      center: new google.maps.LatLng(28.4595, 77.0266),
      zoom: 14,
      // mapTypeId: google.maps.MapTypeId.ROADMAP
      mapTypeId: google.maps.MapTypeId.HYBRID
      // mapTypeId: google.maps.MapTypeId.SATELLITE
      // mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    var marker = new google.maps.Marker({ position: mapProp.center });
    marker.setMap(this.map);
    
    var infowindow = new google.maps.InfoWindow({
      content: 'Hey, We are here'
    });

    infowindow.open(this.map, marker);

  }
}