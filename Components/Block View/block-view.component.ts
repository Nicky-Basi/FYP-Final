import { Component, Input, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {

  @Input() 
  public block:any;

  @Input() 
  selectedBlock: any;
  private blocksInChain: any;

  constructor(private blockchainService: BlockchainService) {
    this.blocksInChain = blockchainService.blockchainInstance
  }

  ngOnInit(): void {
  }

}
