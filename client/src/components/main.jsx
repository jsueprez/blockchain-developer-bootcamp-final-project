import React, { Component } from 'react';
import Market from './market';
import NotFound from './notFound'
import { Route, Redirect, Switch } from 'react-router-dom';

class Main extends Component {
    render() {
        const { nfts, onBuyNft } = this.props;
        return (
            <main className="text-white h-full w-full">
                <Switch>
                    <Route path="/"
                        render={(props) =>
                            <Market
                                nfts={nfts}
                                onBuyNft={onBuyNft}
                                {...props}
                            />}
                    />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect to="/not-found" />
                </Switch>
            </main>);
    }
}

export default Main;