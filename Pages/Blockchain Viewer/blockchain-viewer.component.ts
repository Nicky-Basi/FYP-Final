import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';


@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {
  public blocks: any = [];
  public selectedBlock: any = null; //making the block that the user clicks active which then results in the transaction table of that block being displayed.


  constructor(private blockchainService: BlockchainService) {
    this.blocks = blockchainService.getBlocks();
    this.selectedBlock = this.blocks[0];
    console.log(this.blocks);
  }

  ngOnInit()  {
  }


  showTransactions(block: null){
    console.log(block);
    this.selectedBlock = block
  }
}
