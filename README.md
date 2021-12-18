# Final project - Criollo

## Deployed version url:
https://criollomarket.vercel.app/

## How to run this project locally:

### Preconfiguration, Installation and Running project locally 
1. Install truffle globally if not installed. 
Check if installed using 
```sh
truffle version
```
If not installed install with below 
```sh
$ npm install -g truffle
```

2. If opting to use ganache-cli vs [Ganache GUI](https://www.trufflesuite.com/ganache), install ganache-cli globally. Note that ganache-cli rus on port 8545 and ganache-gui runs on port 7545 as placced in truffle-config.js. Check if ganache-cli installed first with
```sh
ganache-cli --version
```
If not installed install with below
```sh
$ npm install -g ganache-cli
```
Run ganache-cli in different terminal and keep running when compiling,testing, migrating, running app etc
```sh
$ ganache-cli --deterministic -i 5777 --chainId 5777
```
3. Enter project directory and install dependancies
```sh
$ cd blockchain-developer-bootcamp-final-project
$ npm install  
```

#### Migrating contracts and Testing to ensure all is working well

1. To compile contracts e.g you make changes to contracts
```sh
$ truffle compile 
```
2. Migrate contracts to local running instance ganache 
If using ganache-cli use 
```sh
$ truffle migrate --reset --network ganache_cli
```
3. To test contracts 
```sh
$ truffle test
```
4. Interact with locally deployed contracts and excute script to mint tokens.  
```sh
$ truffle exec scripts/mint.js --network ganache_cli
```
5. Run app on localhost front-end
1. Run app locally 
```sh
$ cd client
$ npm start
```
It should open a page in your browser, otherwise open it manually and go to: http://localhost:3000/

The Criollo Market dApp is able to work with 2 differents networks, Rinkeby, and ganache-cli.

- To configure the ganache-cli on metamask, add a network with the following parameters:

![image](https://user-images.githubusercontent.com/19668390/146653762-abae6a2f-2df0-4da0-a949-561abb377218.png)

- To add the wallet given by the ganache-cli instance in Metamask, copy the Mnemonic given by the ganache_cli and import it using secret recovery phrase.

![image](https://user-images.githubusercontent.com/19668390/146654119-963e4a7e-a959-486b-b671-2fe8f408cff1.png)

- If you get TXRejectedError when sending a transaction, reset your Metamask account from Advanced settings.

## How to run this project on Ethereum tesnet:

### Deploying to Ethereum testnets[Rinkeby]

Duplicate the .env.example file and rename it .env. Add the PRIVATE_KEYS as the private key of the Metamask 
account you will use to deploy. This is the same account you will add testnet ether to. On Metamask click Account Details-> Export Private Key to copy private key. Go to [infura.io](https://infura.io/) and create a project and copy the ID into .env as INFURA_ID

- Note that you can use --reset when migrating to replace add new deployments 
e.g truffle migrate --reset --network rinnkeby

1. Migrate contracts to Ethereum Rinkeby testnet. You will need Rinkeby ETH to pay for transactions. 
Get Rinkeby ETH into a Metamask account from this [Rinkeby faucet click here](http://rinkeby-faucet.com/). Copy your Metamask address into site and click "Submit" or this [Rinkey Faucet here](https://faucet.rinkeby.io/) which is prone to not working at times.
```sh
$ truffle migrate --network rinkeby
```
Mint tokens on Rinkeby network
```sh
$ truffle exec scripts/mint.js --network rinkeby
```
You can verify deployment, check transactions etc on [https://rinkeby.etherscan.io/](https://rinkeby.etherscan.io/)

Run app locally 
```sh
$ cd client
$ npm start
```
- If you get TXRejectedError when sending a transaction, reset your Metamask account from Advanced settings.

## Screencast link

## Public Ethereum wallet for certification:

0x6f432D387CfAd37e960D94B6120d2E850Aa2c720

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

Note: Steps 3 and 6 are done in the "Admin" Page, and only the owner of the contract has access to it.

### Future implementation
- Criollo will let the users trade the NFT in its own Marketplace.
- Allow the user to introduce a shipping addres.
- Proof of receipt of physical asset. 
- more ideas coming...

## FILE STRUCTURE
- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Rinkeby testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

