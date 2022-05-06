const SHA256 = require('crypto-js/sha256'); //import SHA256 function
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{ //define a transaction and what it contains
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    calculateHash(){ //returns sha256 hash of the transaction
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){//signing the hash of the transaction
        if(signingKey.getPublic('hex') !== this.fromAddress){//checking if the public key is equal to the value of the 'fromAddress' in this transaction
            throw new Error('You cannot sign transactions for other wallets');//error message when the if statement is true
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');//signing the hash of the transaction
        this.signature = sig.toDER('hex');// store this signature in this transaction
    }

    isValid(){//checking if the signature of the transaction is valid
        if(this.fromAddress === null) return true;//assumes transaction is valid if the 'fromAddress' is empty

        if(!this.signature || this.signature.length === 0){//checking if there is a signature or if the value is empty
            throw new Error ('No signature in this transaction');//outputting error if there is no signature 
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');//making a new public key object from the 'fromAddress'
        return publicKey.verify(this.calculateHash(), this.signature);//verifying the hash of the block has been signed by the signature 'this.signature'.
    }
}
console.time("time for computation");
class Block{ //Define block as a class and its data
    constructor( timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp; // when block was created
        this.transactions = transactions; //data associated with block, i.e details of transactions
        this.previousHash = previousHash; //string of hash of the previous block
        this.hash = this.calculateHash(); 
        this.nonce = 0; //random number that has nothing to do with the block, but 

    }

    calculateHash() { //function to calculate hash of the block. Combines the properties of the block and then runs them through the sha256 hashing function to create a sha256 hash
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){ //method to make the hash of the blocks begin with a certain amount, defined by the difficulty,  of zeros 
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){ //while loop keeps running until the hash starts with the right amount of zeros
            this.nonce++; //increments by 1 whilst the hash does not have enough zeros to match the amount defined by the difficulty
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);   //"block mined" is output and then displays the value for the hash property
    }

    hasValidTransactions(){//method to verify all transactions in current block
        for(const tx of this.transactions){
            if(!tx.isValid()){//function to loop through all transactions in the block and verify them with the 'isValid' method
                return false;
            }
        }

        return true;
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

    minePendingTransactions(miningRewardAddress){ //receives 'miningRewardAddress' when called
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);//creating a new block with a timestamp, transactions
        block.mineBlock(this.difficulty);//mining the block with the difficulty currently set within the blockchain property 'difficulty'

        console.log('Block successfully mined');//output "block successfully mined"
        this.chain.push(block);//adding the block to the chain

        this.pendingTransactions = [];//reset the pending transactions array
    }

    createTransaction(transaction){//receiving a transaction and pushing it to the pending transaction array

        if(!transaction.fromAddress || !transaction.toAddress){//checking if the transation has a to and from address
            throw new Error('Transation must include from and to address');
        }

        if(!transaction.isValid()){//checking if the transaction is valid 
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);//push to pending transaction array after passing through if statements
    }

    getBalanceOfAddress(address){ //method to check the balance of an address
        let balance = 0; //balance starts at zero

        for(const block of this.chain){ //looping over all the blocks in the blockchain
            for(const trans of block.transactions){ //loop of each transaction inside a block
                if(trans.fromAddress === address){ //if statement checking if the 'fromAddress' is equal to the 'address'
                    balance -= trans.amount;// reducing the balance of the fromAddress by the amount of the transaction 'trans.amount'
                }

                 if(trans.toAddress === address){
                balance += trans.amount; //increase the addresses balance by the amount of the transaction 'trans.amount'
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
    getAllTransactionsForWallet(address) { //check transactions to and from the given walletaddress
        const txs = [];

        for (const block of this.chain) { // looping over all the blocks in the chain
            for (const tx of block.transactions) { //loop of each transaction inside a block
                if (tx.fromAddress === address || tx.toAddress === address) { // if statement checking if the 'fromAddress' is equal to the 'address' and checking if the 'toAddress' is equal to the 'address'
                    txs.push(tx);
                }
            }
        }
        return txs;
    }

    chainValidity(){
        for(let i = 1; i < this.chain.length; i++){ // block 0 is the 'genisis block' so i starts at 1
            const currentBlock = this.chain[i]; //identifying where the blocks are positioned in the chain
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransactions()){
                return false;
            }

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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction; 
module.exports.Block = Block;