import { Component, OnInit } from '@angular/core';
import { EthClientService } from '../eth-client.service';

@Component({
  selector: 'app-eth-events',
  templateUrl: './eth-events.component.html',
  styleUrls: ['./eth-events.component.css']
})
export class EthEventsComponent implements OnInit {

  constructor(private ethClient: EthClientService) { }

  ngOnInit() {
    
  }

}
