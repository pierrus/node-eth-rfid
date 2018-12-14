import { Component, OnInit } from '@angular/core';

import { RfidTrackerService } from './rfid-tracker.service';
import { TrackingEntry } from './tracking-entry';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  trackingEntries: TrackingEntry[] = [];

  constructor(private ethService: RfidTrackerService) { }

  ngOnInit() {
    this.ethService.GetTrackingEntries().subscribe(trackingEntry => { this.trackingEntries.push(trackingEntry) });
  }

}
