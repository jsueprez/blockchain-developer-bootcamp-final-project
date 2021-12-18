import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Identicon from 'identicon.js';

class NavBar extends Component {
    render() {
        const { web3, account, network, balance, contractOwner } = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-nav mb-4 text-center">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white"
                        to="/market">
                        Criollo NFT
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <NavLink className="nav-item nav-link text-white" to="/market">
                                MARKET
                            </NavLink>
                            <NavLink className="nav-item nav-link text-white" to="/myNft">
                                MY NFT
                            </NavLink>
                            {account && contractOwner ?
                                <NavLink className="nav-item nav-link text-white" to="/admin">
                                    ADMIN
                                </NavLink> :
                                null
                            }
                        </div>
                    </div>
                    {account ?
                        <div className="d-flex text-white">
                            <ul className="navbar-nav ml-auto ">
                                <li className="nav-item me-2 networkNav small">
                                    <b >{network}</b>
                                </li>
                                <li className="nav-item  me-2 balanceNav small">
                                    <b className="m-2">{balance}</b>
                                    <b>ETH</b>
                                </li>
                                <li className="nav-item accountNav small">
                                    {network === 'Main' || network === 'Private' || network === 'Wrong network'
                                        ? <b><a
                                            style={{ color: "#009985" }}
                                            href={`https://etherscan.io/address/` + account}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {account.substring(0, 5) + '...' + account.substring(38, 42)}
                                            &nbsp;
                                        </a></b>
                                        : <b><a
                                            style={{ color: "#009985" }}
                                            href={`https://${network}.etherscan.io/address/` + account}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {account.substring(0, 6) + '...' + account.substring(38, 42)}
                                        </a></b>}
                                    <img
                                        alt="id"
                                        className="id border border-success ms-2"
                                        width="20"
                                        height="20"
                                        src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                                    />
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="d-flex text-white">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav ml-auto">
                                    {web3
                                        ? <button
                                            type="Success"
                                            className="btn btn-outline btn-block "
                                            style={{ backgroundColor: "#55FF55", color: "#000000" }}
                                            onClick={async () => {
                                                try {
                                                    await window.ethereum.enable()
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                        >
                                            C O N N E C T
                                        </button>
                                        : <button
                                            className="btn btn-warning"
                                            type="button"
                                            onClick={() => {
                                                try {
                                                    window.open("https://metamask.io/")
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                        >
                                            Get MetaMask
                                        </button>
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </nav >

        );

    }
}

export default NavBar;