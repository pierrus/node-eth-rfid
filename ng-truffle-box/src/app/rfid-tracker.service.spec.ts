import {TestBed, inject} from '@angular/core/testing';
const Web3 = require('web3');

import { Observable, Observer, Subject } from 'rxjs';

import { RfidTrackerService } from './rfid-tracker.service';

import { TrackingEntry } from './tracking-entry';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';

declare let window: any;

describe('Web3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RfidTrackerService ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule
      ]
    });
  });

  it('should be created', inject([RfidTrackerService], (service: RfidTrackerService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve previous tracking entries', inject([RfidTrackerService], (service: RfidTrackerService) => {
    let entriesObservable: Observable<TrackingEntry>  = service.GetTrackingEntries();

    return entriesObservable.subscribe((entry) => {
      expect(entry).toBeTruthy();
      expect(entry.Rfid).toBeTruthy();
    });
  }));

});
