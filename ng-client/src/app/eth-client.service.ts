import { Injectable } from '@angular/core';
import { web3 } from 'web3';
import { Observable, Observer } from 'rxjs';
import { TrackingEntry } from './tracking-entry'

@Injectable({
  providedIn: 'root'
})
export class EthClientService {

  w3: web3;
  contractAbi:string = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_rfid", "type": "string" }, { "name": "_latitude", "type": "string" }, { "name": "_longitude", "type": "string" }, { "name": "_timestamp", "type": "uint256" } ], "name": "track", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x0decb3a6" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x9fD9669C5Aa7Fa14c20e7d9Bae1709A602b2fe38" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8da5cb5b" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "entries", "outputs": [ { "name": "rfid", "type": "string", "value": "[201, 94, 80, 211, 20]" }, { "name": "latitude", "type": "string", "value": "" }, { "name": "longitude", "type": "string", "value": "" }, { "name": "timestamp", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xb30906d4" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_rfid", "type": "string" }, { "indexed": false, "name": "_latitude", "type": "string" }, { "indexed": false, "name": "_longitude", "type": "string" }, { "indexed": false, "name": "_timestamp", "type": "uint256" } ], "name": "newEntryEvent", "type": "event", "signature": "0x4a5f7b0f2e936b05709f143369f2b7c112950c98036497d874e3398772ebd4f5" } ]');
  //Tracking contract address
  contractAddress:string = '0x13c0cCBc8C87f9e6f3276d07Bf8895A45F15C6D9';
  contractInstance:any;
  ethereumAddress:string;

  constructor() { }

  ngInit()
  {
    this.w3 = new web3();
    this.w3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1"));

    this.contractInstance = web3.eth.contract(this.contractAbi).at(this.contractAddress);
    this.ethereumAddress = web3.eth.accounts[0];

    console.log('Ethereum client initialized');

    this.contractInstance.newEntryEvent({}, (error, msg) => {
      console.log(msg);
      this.ManageNewEntry(msg);
    });
  }

  private ManageNewEntry(message: any)
  {

  }

  public GetEntries(oberver: Observer<TrackingEntry>):  Observable<TrackingEntry>
  {
    return null;
  }
}
