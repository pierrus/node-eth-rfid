import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { TrackingEntry } from './tracking-entry';
import { Web3Service } from './util/web3.service';

import { MatSnackBar } from '@angular/material';

declare let require: any;

@Injectable({
  providedIn: 'root'
})
export class RfidTrackerService {

  private contractAbi:string = require('../../build/contracts/Tracking.json');
  //Tracking contract address
  private contractAddress:string = '0x5a0b02c07148394f390694487e58f118b29166c6';
  private contractInstance:any;
  private ethereumAddress:string;
  private rfidTrackingContract: any;

  private entriesObserver: Subject<TrackingEntry> = new Subject<TrackingEntry>();

  constructor(private matSnackBar: MatSnackBar, private web3Service: Web3Service)
  {
    window.addEventListener('load', (event) => {
      this.bootStrap();
    });
  }

  bootStrap(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.web3Service.artifactsToContract(this.contractAbi)
      .then((contractAbstraction) => {
        this.rfidTrackingContract = contractAbstraction;
        console.log(contractAbstraction);
        this.rfidTrackingContract.at(this.contractAddress).then(instance => {
          console.log(instance);
          this.contractInstance = instance;
          this.matSnackBar.open('Contract instantiated from address ' + this.contractAddress, null, {duration: 3000});

          this.contractInstance.newEntryEvent().watch((err, result) =>
          {
            console.log (result);
            this.ManageNewEntry(result.args._rfid, result.args._latitude, result.args._longitude, result.args._timestamp);
          });
          
          this.contractInstance.newEntryEvent({}, { fromBlock: 0, toBlock: 'latest' }).get((error, previousEvents) => {
            
            previousEvents.forEach(result =>
            {
              console.log (result.args._rfid);
              this.ManageNewEntry(result.args._rfid, result.args._latitude, result.args._longitude, result.args._timestamp);
            });
          });
        });
    });
  }

  public GetTrackingEntries() : Observable<TrackingEntry>
  {
    return this.entriesObserver;
  }

  // Converts message to entry and store it locally
  private ManageNewEntry(rfid: string, latitude: string, longitude: string, timestamp: number)
  {
    let newEntry:TrackingEntry = new TrackingEntry(rfid, latitude, longitude, timestamp);
    this.entriesObserver.next(newEntry);
    this.matSnackBar.open('New tracking event RFID #' + rfid, null, {duration: 3000});
  }
}
