import React, { Component } from "react";
import NavBar from './components/navbar';
import Main from './components/main'
import './Style.css'
import Criollo from "./contracts/CriolloToken.json";

import Web3 from 'web3'

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchNft } from './services/nftService'

import "./App.css";

class App extends Component {
  state = {
    web3: null,
    account: null,
    network: null,
    balance: null,
    contract: null,
    nfts: [],
    myNfts: [],
    contractOwner: null
  };

  async UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount')
    await this.loadBlockchainData();
  };

  async loadBlockchainData() {
    /* Case 1, User connect for 1st time */
    if (typeof window.ethereum !== 'undefined') {
      await this.update()
      /* Case 2 - User switch account */
      window.ethereum.on('accountsChanged', async (accounts) => {
        await this.update()
        if (!this.state.contractOwner) window.location.href = "/";
      });
      /* Case 3 - User switch network */
      window.ethereum.on('chainChanged', async () => {
        console.log('chainChanged');
        await this.update()
      });
    }
  }

  update = async () => {
    try {
      let web3, account, netId, contract

      web3 = await this.loadWeb3()
      await this.loadNetwork(web3)
      account = await this.loadAccount(web3)
      netId = await web3.eth.net.getId()
      contract = await this.loadContract(web3, netId)
      await this.checkOwnerShip(contract)
      await this.loadNftData(contract)
      await this.loadMyNfts(contract);

      if (account && contract) await this.loadBalance(web3, account);
    } catch (e) {
      console.log('Error, update data: ', e)
    }
  }

  loadNftData = async (contract) => {
    try {
      const data = await contract.methods.fetchMarketItems().call();
      const items = await Promise.all(data.map(async i => {
        const tokenURI = await contract.methods.tokenURI(i.tokenId).call();
        const meta = await fetchNft(tokenURI);
        let item = {
          id: i.tokenId,
          state: i.state,
          price: Web3.utils.fromWei(i.price, 'ether'),
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
      this.setState({ nfts: items })
      return items;
    } catch (e) {
      console.log('Error, load images', e)
    }
  }

  loadMyNfts = async (contract) => {
    try {
      const data = await contract.methods.fetchMyNft().call();
      const items = await Promise.all(data.map(async i => {
        const tokenURI = await contract.methods.tokenURI(i.tokenId).call();
        const meta = await fetchNft(tokenURI);
        let item = {
          id: i.tokenId,
          state: i.state,
          price: Web3.utils.fromWei(i.price, 'ether'),
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
      this.setState({ myNfts: items })

      return items;
    } catch (e) {
      console.log('Error, load images', e)
    }
  }

  loadWeb3 = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.autoRefreshOnNetworkChange = false;
        const web3 = new Web3(window.ethereum);
        this.setState({ web3 })
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
      this.setState({ network })
      return network
    } catch (e) {
      this.setState({ network: 'Wrong network' })
      console.log('Error, load network: ', e);
    }
  }

  loadAccount = async (web3) => {
    try {
      const accounts = await window.ethereum.request({
        method:
          'eth_accounts'
      });
      const account = await accounts[0];
      if (typeof account !== 'undefined') {
        this.setState({ account })
        web3.eth.defaultAccount = account;
        return account;
      } else {
        this.setState({ account: null })
        return null;
      }
    } catch (e) {
      console.log('Error, load account: ', e)
    }
  }

  loadBalance = async (web3, account) => {
    try {
      const weiBalance = await web3.eth.getBalance(account);
      const etherBalance = (weiBalance / 10 ** 18).toFixed(5);
      this.setState({ balance: etherBalance })
      return etherBalance;
    } catch (e) {
      console.log('Error, load balance: ', e)
    }
  }

  loadContract = async (web3, netId) => {
    try {
      const contract = new web3.eth.Contract(Criollo.abi, Criollo.networks[netId].address);
      this.setState({ contract })
      return contract;
    } catch (e) {
      toast.info('Wrong network!');
      console.log('Error, load contract: ', e);
      this.setState({ contract: null })
      return null;
    }
  }

  checkOwnerShip = async (contract) => {
    try {
      const contractOwner = await contract.methods.isOwner().call();
      this.setState({ contractOwner })
      return contractOwner;
    } catch (e) {
      console.log('Error, loaing the contract owner', e)
    }
  }

  handleBuyNft = async (id, price) => {
    try {
      const web3 = await this.loadWeb3();
      await this.loadNetwork(web3);
      const account = await this.loadAccount(web3);
      const netId = await web3.eth.net.getId();
      const contract = await this.loadContract(web3, netId);
      const amount = web3.utils.toWei(price, 'ether');

      await contract.methods.buy(id).send({ from: account, value: amount })
        .on('receipt', async (r) => {
          this.update()
          toast.success(`Congratulations, you've received Criollo NFT with ID: ${id}`)
        })
        .on('error', (error) => {
          console.error(error)
          toast.error(`There was an error!`)
        })
    } catch (e) {
      console.log('Error, buy NFT', e)
    }
  }

  handleUnlockNft = async (id) => {
    try {
      const web3 = await this.loadWeb3();
      await this.loadNetwork(web3);
      const account = await this.loadAccount(web3);
      const netId = await web3.eth.net.getId();
      const contract = await this.loadContract(web3, netId);

      await contract.methods.unlockToken(id).send({ from: account })
        .on('receipt', async (r) => {
          this.update()
          toast.success(`Congratulations, you've unlocked Criollo NFT with ID: ${id}`)
        })
        .on('error', (error) => {
          console.error(error)
          toast.error(`There was an error!`)
        })
    } catch (e) {
      console.log('Error, Unlocking NFT', e)
    }
  }

  handleChangeNftState = async (id, price, state) => {
    try {
      const web3 = await this.loadWeb3();
      await this.loadNetwork(web3);
      const account = await this.loadAccount(web3);
      const netId = await web3.eth.net.getId();
      const contract = await this.loadContract(web3, netId);
      const amount = web3.utils.toWei(price, 'ether');

      state === '0' ?
        await contract.methods.addToMarketPlace(id, amount).send({ from: account })
          .on('receipt', async (r) => {
            this.update()
            toast.success(`Criollo #${id} has been added to the MarketPlace`)
          })
          .on('error', (error) => {
            console.error(error)
            toast.error(`There was an error adding the item to the Market Place!`)
          })
        :
        await contract.methods.shipped(id).send({ from: account })
          .on('receipt', async (r) => {
            this.update()
            toast.success(`Criollo #${id} has been Shipped`)
          })
          .on('error', (error) => {
            console.error(error)
            toast.error(`There was an error changing the item state to : Shipped!`)
          })
    } catch (e) {
      console.log('Error, changing the state of Criollo item', e)
    }

  }

  render() {
    const { web3, network, account, nfts, balance, myNfts, contractOwner } = this.state;
    return (
      <React.Fragment>

        <ToastContainer />
        <NavBar
          web3={web3}
          account={account}
          network={network}
          balance={balance}
          contractOwner={contractOwner}
        >
        </NavBar>
        <Main
          nfts={nfts}
          myNfts={myNfts}
          onBuyNft={this.handleBuyNft}
          onUnlockNft={this.handleUnlockNft}
          onChangeNftState={this.handleChangeNftState}
          contractOwner={contractOwner}

        >
        </Main>
      </React.Fragment>
    );

  }
}

export default App;
