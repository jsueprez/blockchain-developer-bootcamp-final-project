import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import eth from '../images/eth.png'
import Identicon from 'identicon.js';

class NavBar extends Component {
    render() {
        return (
            < nav className="navbar navbar-expand-lg navbar-light bg-light mb-4" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Criollo NFT</Link>
                    <button className="navbar-toggler" type="button" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <NavLink className="nav-item nav-link" to="/movies">
                                MARKET
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/customers">
                                MY NFT
                            </NavLink>

                        </div>
                    </div>
                </div>
            </nav >
        );
    }
}

export default NavBar;