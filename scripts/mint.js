const CRIOLLO = artifacts.require("CriolloToken")
const fs = require('fs');
var Web3 = require('web3');


// !(migrate --reset) contract before running the script!

module.exports = async function (callback) {
  try {
    const totalSupply = 25;
    const etherValue = '0.2'
    const weiPrice = Web3.utils.toWei(etherValue, 'ether');
    const criollo = await CRIOLLO.deployed()

    console.log('\nMinting NFTs...')
    for (let i = 1; i <= totalSupply; i++) {
      await criollo.safeMint(weiPrice);
    }
    console.log('\n\nSuccess.')
  } catch (error) {
    console.log(error)
  }
  callback()
}