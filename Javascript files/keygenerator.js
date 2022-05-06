const EC = require('elliptic').ec;//importing elliptic library which generates a public and private key & sign and verify a signature 
const ec = new EC('secp256k1');//using secp256k1 elliptic curve

const key = ec.genKeyPair();//generating key pairs
const publicKey = key.getPublic('hex');//extracting public key
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key:', privateKey);

console.log();
console.log('Public key:', publicKey);