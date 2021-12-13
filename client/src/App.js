import React, { Component } from "react";
import NavBar from './components/navbar';
import Main from './components/main'
import './Style.css'
import Criollo from "./contracts/CriolloToken.json";
import getWeb3 from "./getWeb3";

import Web3 from 'web3'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchNft } from './services/nftService'

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, nfts: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // //Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Criollo.networks[networkId];
      const instance = new web3.eth.Contract(
        Criollo.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const data = await instance.methods.fetchMarketItems().call();
      const items = await Promise.all(data.map(async i => {
        const tokenURI = await instance.methods.tokenURI(i.tokenId).call();
        const meta = await fetchNft(tokenURI);
        let item = {
          id: i.tokenId,
          state: i.state,
          price: web3.utils.fromWei(i.price, 'ether'),
          image: meta.data.image,
          name: meta.data.name,
          attributes: {
            background: meta.data.attributes[0].value,
            design: meta.data.attributes[1].value,
            logo: meta.data.attributes[2].value
          },
        }

        return item;
      }));

      this.setState({ web3, accounts, nfts: items })

      // 
      // console.log(balance)
      // // Set web3, accounts, and contract to the state, and then proceed with an
      // // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  loadWeb3 = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.autoRefreshOnNetworkChange = false;
        const web3 = new Web3(window.ethereum);
        return web3
      }
    } catch (e) {
      console.log('Error, load Web3: ', e)
    }
  }

  loadNetwork = async (web3) => {
    try {
      let network = await web3.eth.net.getNetworkType()
      network = network.charAt(0).toUpperCase() + network.slice(1);
      return network
    } catch (e) {
      console.log('Error, load network: ', e);
    }
  }

  loadAccount = async (web3) => {
    try {
      const accounts = await web3.eth.getAccounts()
      const account = await accounts[0];
      if (typeof account !== 'undefined') {
        return account;
      } else {
        return null;
      }
    } catch (e) {
      console.log('Error, load account: ', e)
    }
  }

  loadBalance = async (web3, account) => {
    try {
      const etherBalance = await web3.eth.getBalance(account);
    } catch (e) {
      console.log('Error, load balance: ', e)
    }
  }

  loadContract = async (web3, netId) => {
    try {
      const contract = new web3.eth.Contract(Criollo.abi, Criollo.networks[netId].address);
      return contract;
    } catch (e) {
      window.alert('Wrong network!');
      console.log('Error, load contract: ', e);
      return null;
    }
  }

  handleBuyNft = async (id, price) => {
    console.log(id, price);
    try {
      const web3 = await this.loadWeb3();
      await this.loadNetwork(web3);
      const account = await this.loadAccount(web3);
      const netId = await web3.eth.net.getId();
      const contract = await this.loadContract(web3, netId);
      const amount = web3.utils.toWei(price, 'ether');

      await contract.methods.buy(id).send({ from: account, value: amount })
        .on('receipt', async (r) => {
          //update()
          window.alert(`Congratulations, you've received NFT with ID: ${id}\nAddress: ${Criollo.networks[netId].address}`)
        })
        .on('error', (error) => {
          console.error(error)
          window.alert(`There was an error!`)
        })
    } catch (e) {
      console.log('Error, buy NFT', e)
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <React.Fragment>

        <ToastContainer />
        <NavBar></NavBar>
        <Main
          nfts={this.state.nfts}
          onBuyNft={this.handleBuyNft}
        >
        </Main>
      </React.Fragment>
    );

  }
}

export default App;
