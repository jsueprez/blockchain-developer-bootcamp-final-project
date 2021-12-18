# Final project - Criollo

## Deployed version url:
https://criollomarket.vercel.app/

## How to run this project locally:

### Prerequisites
- Node.js >= v14
- Truffle and Ganache
- Npm
- git checkout

### Contracts
- Run `npm install` in project root to install Truffle build and smart contract dependencies
- In another terminal run local testnet in port `7545` with an Ethereum client, e.g. Ganache  
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`

## About
Criollo is a NFT Market Place project that combine the nature of art, the tasty flavor of chocolate and the technology behind the blockchain to create the most unique experience.  

This project was inspired by [@aisthisi_nft](https://aisthisi.art/)

## Project description
Inititally, for the purpose of this final project, Criollo will consists on two parties:

- Criollo[Contract owner], will mint all the NFT.

- The buyer[Token owner], could buy/trade the NFT.

## Simple workflow
1. Criollo create the art.
2. Criollo mint NFT, set an initial price.
3. Criollo list the NFT to the Market Place.
4. The buyer could buy only NFTs that are in Criollo's Market Place.
5. Once the buyer buys a NFT, NFT get locked, so the buyer could not sell/transfer it.
6. Criollo send the physical asset(Criollos's Chocolate) to the buyer and update the status of the NFT.
7. Once the buyer received the physical asset, the NFT can be unlocked by the buyer.
8. The buys can now sell/transfer the NFT.

## Deployed version url:

### Future implementation
- Criollo will let the users trade the NFT in its own Marketplace.
- Allow the user to introduce a shipping addres.
- Proof of receipt of physical asset. 
- more ideas coming...

### Prerequisites
- Node.js >= v14
- Truffle and Ganache
- `git checkout master`



### Frontend
- cd client
- npm install
- npm start
- Open http://localhost:3000


## Screencast link

## Public Ethereum wallet for certification:

## FILE STRUCTURE
- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Rinkeby testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

