import React, { Component } from 'react';
import NotFound from './common/notFound'
import { Route, Redirect, Switch } from 'react-router-dom';
import MyNft from './myNft';
import Market from './market';

class Main extends Component {
    render() {
        const { nfts, myNfts, onBuyNft } = this.props;

        return (
            <main className="text-white h-full w-full">
                <Switch>
                    <Route path="/market" render={(props) =>
                        <Market nfts={nfts} onBuyNft={onBuyNft} {...props} />
                    } />
                    <Route path="/myNft" render={(props) =>
                        <MyNft nfts={myNfts} onBuyNft={onBuyNft} {...props} />
                    } />
                    <Redirect from="/" to="/market" />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect to="/not-found" />
                </Switch>
            </main>);
    }
}

export default Main;