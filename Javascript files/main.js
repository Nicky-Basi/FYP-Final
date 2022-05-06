const {Blockchain, Transaction} = require('./blockchain.js'); // importing the two classess 
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('d0ab952daf6aae504e7e8e1480283c1de481524991f5b4f8d8059cf11c470bd6');//enter private key which is generated using keygenerator.js file
const myWalletAddress = myKey.getPublic('hex');//calculate public key, which is also the wallet address


let nickyCoin = new Blockchain(); //create new instance of Blockchain class


const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);// this is a transaction where an amount of '10'coins is going from 'myWalletAddress' to another wallet known as by the public key of that wallet
tx1.signTransaction(myKey);//signing transaction with my key
nickyCoin.createTransaction(tx1);//adding transation to the blockchain

//nickyCoin.createTransaction(new Transaction('address1', 'address2', 100));
//nickyCoin.createTransaction(new Transaction('address1', 'address2', 50));

console.log('\n Starting the miner...');
nickyCoin.minePendingTransactions(myWalletAddress);//mining a block and sends the mining rewards to the address called myWalletAddress

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