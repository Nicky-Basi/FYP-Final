import { Injectable } from '@angular/core';
import { Blockchain } from 'src/app/blockchain.js';
import EC from 'elliptic'

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchainInstance = new Blockchain();
  public walletKeys: any = [];

  constructor() {
    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions('my-wallet-address');
    this.generateWalletKeys();
  }

  getBlocks(){
    return this.blockchainInstance.chain;
  }
  
  createTransaction(tx: any) {
    this.blockchainInstance.createTransaction(tx);
  }
  getPendingTransactions(){
    return this.blockchainInstance.pendingTransactions;
  }

  minePendingTransactions(){
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }
  
 

  private generateWalletKeys(){
    const ec = new EC.ec ('secp256k1');
    const key = ec.genKeyPair();
  
    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });

  
  }
  
  }





