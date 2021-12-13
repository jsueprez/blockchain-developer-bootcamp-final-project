const CRIOLLO = artifacts.require("CriolloToken")
const fs = require('fs');
var Web3 = require('web3');


// Tokens needs to be minted before

module.exports = async function (callback) {
  try {
    const tokensToMarketPlace = 25;
    const etherValue = '0.5'
    const weiPrice = Web3.utils.toWei(etherValue, 'ether').toString();
    const criollo = await CRIOLLO.deployed()

    console.log('\nAdding  tokens to Market place...')
    for (let i = 1; i <= tokensToMarketPlace; i++) {
      await criollo.addToMarketPlace(i, weiPrice);
    }
    console.log('\n\nSuccess.')
  } catch (error) {
    console.log(error)
  }
  callback()
}