# Final project - Criollo
###About
Criollo is a NFT Store project that combine the nature of art, the tasty flavor of chocolate and the technology behind the blockchain to create the most unique experience.  

This project was inspired by [@aisthisi_nft](https://aisthisi.art/)
## Project description
Inititally, for the purpose of this final project, Criollo will consists on two parties:

Criollo[Artist and chocolate maker], will have a portal to mint the Criollo NFT. The art consist in a unique design with a meaningful message.  Afterwards, the NFT will be listed for sale in an Ethereum Marketplace like Opensea so "The Buyer" can access to it.

The buyer, could buy the NFT in the marketplace, the smart contract is designed in a way that the token transfer functionality will be locked until the buyer receive the product(package printed with the art and a delicious chocolate inside). For the purpose of this project, proof of delivery will simulated using a perdiod of locking time, so after the NFT is bought, the transfer function will be locked during 1 min. 

## Simple workflow
1. Criollo create the art.
2. Criollo mint NFT and list it in the marketplace.
3. The buyer buy in the NFT in the marketplace.
4. The NFT is locked for being transfered fro a period of time.(Simulating shipping time)
5. The NFT is unlocked for being transfered(Proof of delivery)
6. Withdrawn function only possible to trigger from the Creator.
7. Creator also receives royalties anytime the NFT is sold.
8. ## Deployed version url:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Yarn
- `git checkout master`

### Contracts

- Run `npm install` in project root to install Truffle build and smart contract dependencies
- Run local testnet in port `7545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`

### Frontend

## Screencast link

## Public Ethereum wallet for certification:

## FILE STRUCTURE
- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Rinkeby testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.
