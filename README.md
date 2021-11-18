# Final project - Criollo
### About
Criollo is a NFT Store project that combine the nature of art, the tasty flavor of chocolate and the technology behind the blockchain to create the most unique experience.  

This project was inspired by [@aisthisi_nft](https://aisthisi.art/)

## Project description
Inititally, for the purpose of this final project, Criollo will consists on two parties:

Covered in  the final Project
- Criollo[Contract owner], will mint all the NFT initially.

- The buyer[Token owner], could buy/trade the NFT.

## Simple workflow
1. Criollo create the art.
2. Criollo mint NFT, set an initial price.🆗
3. Criollo can set the status of the NFT to <FORSALE>.🆗
4. The buyer could buy only NFTs that are in <FORSALE> state.🆗
5. Once the buyer buys a NFT, status is set automatically to <LOCKED>.🆗
6. Criollo can retrieve the list of IDs which are <LOCKED> and change them to <SHIPPED>.🆗
7. A timer will run for 1 minute(to simulate the shipment process).
8. When timeout, the NFT token id will change the state to <UNLOCKED>. Representing that the buyer received the phisical asset(Chocolate)
9. The Buyer could only trade the NFT when it is in <UNLOCKED> state.🆗
10. Criollo has the possibility to withdraw funds received by the sales of the NFT. 🆗
11. The first buyer also receive royalties anytime the NFT is sold.

## Deployed version url:

### Future implementation
- Criollo will provide a MarketPLace where the token owners can trade their assets.
- Criollo will let any user mint a digital asset and afterward transfer it as a gift(NFT + chocolate)
- Allow the user to introduce a shipping addres.
- more ideas coming...

### Prerequisites
- Node.js >= v14
- Truffle and Ganache
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

## TODO
### Smart contract
1. Update baseURI 
2. Implement/check how tokenURI is added to the mint
3. Check mint function to change state of the token_ID
4. Add validation to trade function
5. Check withdraw function

### FrontEnd
1. Check code for mint button
2. Interact with Metamask
3. Message when minted

### IPFS
1. Select some Images
2. check how to use a json generator
3. Upload images to the ipfs
4. Upload json to the ipfs
