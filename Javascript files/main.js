const {Blockchain, Transaction} = require('./blockchain.js'); // importing the two classess 
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('d0ab952daf6aae504e7e8e1480283c1de481524991f5b4f8d8059cf11c470bd6');//enter private key which is generated using keygenerator.js file
const myWalletAddress = myKey.getPublic('hex');//calculate public key, which is also the wallet address

/*const SHA256 = require('crypto-js/sha256'); //import SHA256 function

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
console.time("time for computation");
class Block{ //Define block as a class and its data
    constructor( timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp; // when block was created
        this.transactions = transactions; //data associated with block, i.e details of transactions
        this.previousHash = previousHash; //string of hash of the previous block
        this.hash = this.calculateHash(); 
        this.nonce = 0;

    }

    calculateHash() { //function to calculate hash of the block
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){ //make the hash of the blocks begin with a certain amount, defined by the difficulty,  of zeros 
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){ //while loop keeps running until the hash starts with the right amount of zeros
            this.nonce++; //increments by 1 whilst the hash does not have enough zeros to match the amount defined by the difficulty
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);   
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; //initialising blockchain 
        this.difficulty = 2; // adding difficulty as a property of the blockchain and defining how many zeros there should be at the start of the hash of the block
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(Date.parse("2022-01-01"), [], "0"); // adding the first block manually
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]; //returning latest block in the chain
    }

    minePendingTransactions(miningRewardAddress){
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined');
        this.chain.push(block);

        this.pendingTransactions = [new Transaction];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                 if(trans.toAddress === address){
                balance += trans.amount;
                }
            }
        }

        return balance;
    }    
    //addBlock(newBlock){  (old method)
        //newBlock.previousHash = this.getLatestBlock().hash; //adding new block onto chain and setting previous hash property of new block, by finding it using the getLatestBlock method
       // newBlock.mineBlock(this.difficulty);
        //this.chain.push(newBlock); //adding new block to the chain with updated hash value
    //}

    chainValidity(){
        for(let i = 1; i < this.chain.length; i++){ // block 0 is the 'genisis block' so i starts at 1
            const currentBlock = this.chain[i]; //identifying where the blocks are positioned in the chain
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){ //recalculates hash value of the current block to check if it is still valid
                return false; 
            }

            if(currentBlock.previousHash !== previousBlock.hash){ // checks if the currentblock is storing the correct hash of the previous block, by checking the hash of thee previous block. If the current block does not point to the correct previous block then the chain is not valid and returns false.
                return false;
            }
        }

        return true; // if the loop runs through all the blocks and doesnt return false, then the chain is valid and it returns true
    }
}
*/
let nickyCoin = new Blockchain(); //create new instance of Blockchain class


const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);// this is a transaction where an amount of '10'coins is going from 'myWalletAddress' to another wallet known as by the public key of that wallet
tx1.signTransaction(myKey);//signing transaction with my key
nickyCoin.createTransaction(tx1);//adding transation to the blockchain

//nickyCoin.createTransaction(new Transaction('address1', 'address2', 100));
//nickyCoin.createTransaction(new Transaction('address1', 'address2', 50));

console.log('\n Starting the miner...');
nickyCoin.minePendingTransactions(myWalletAddress);//sends the mining rewards to the address called myWalletAddress

console.log('\nBalance of charles is', nickyCoin.getBalanceOfAddress(myWalletAddress));//checking the balance of the wallet which has been entered

//console.log('\n Starting the miner again');
//nickyCoin.minePendingTransactions('charles-address');

//console.log('\nBalance of charles is', nickyCoin.getBalanceOfAddress('charles-address'));  
//console.log('Mining Block 1 ...');
//nickyCoin.addBlock(new Block(1, "10/01/2022", { amount: 4}));

//console.log('Mining Block 2 ...');
//nickyCoin.addBlock(new Block(2, "12/01/2022", { amount: 10}));

//console.timeEnd("time for computation");
//console.log('Is blockchain valid? ' + nickyCoin.chainValidity());


//nickyCoin.chain[1].data = {amount: 100};
//nickyCoin.chain[1].hash = nickyCoin[1].calculateHash();

//console.log('Is blockchain valid? ' + nickyCoin.chainValidity());

//console.log(JSON.stringify(nickyCoin, null, 4));