import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public blockchain;
  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
  }

  ngOnInit() {}

}
  

    
  

