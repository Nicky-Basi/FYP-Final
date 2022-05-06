import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/blockchain.js'
import { BlockchainService, } from 'src/app/services/blockchain.service'
@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  public newTx: any ;
  public walletKey;

  constructor(private blockchainService: BlockchainService) {
    this.walletKey = blockchainService.walletKeys[0];
   }

  ngOnInit(): void {
    this.newTx = new Transaction();
  }

  createTransaction(){
    this.newTx.fromAddress = this.walletKey.publicKey;
    this.newTx.signTransaction(this.walletKey.keyObj);

    this.blockchainService.createTransaction(this.newTx);

    this.newTx = new Transaction();
  }

}
