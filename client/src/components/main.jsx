import React, { Component } from 'react';
import NotFound from './common/notFound'
import { Route, Redirect, Switch } from 'react-router-dom';
import MyNft from './myNft';
import Market from './market';
import Admin from './admin';

class Main extends Component {
    render() {
        const { nfts, myNfts, onBuyNft, onUnlockNft, onChangeNftState, contractOwner } = this.props;

        return (
            <main className="h-full w-full">
                <Switch>
                    <Route path="/admin" render={(props) =>
                        <Admin contractOwner={contractOwner} data={nfts} onChangeNftState={onChangeNftState} {...props} />
                    } />
                    <Route path="/market" render={(props) =>
                        <Market nfts={nfts.filter(item => item.state < 2)} onBuyNft={onBuyNft}  {...props} />
                    } />
                    <Route path="/myNft" render={(props) =>
                        <MyNft nfts={myNfts} onBuyNft={onBuyNft} onUnlockNft={onUnlockNft} {...props} />
                    } />
                    <Redirect from="/" to="/market" />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect to="/not-found" />
                </Switch>
            </main>);
    }
}

export default Main;