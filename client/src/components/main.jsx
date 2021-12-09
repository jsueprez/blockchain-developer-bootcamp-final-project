import React, { Component } from 'react';
import Market from './market';
import NotFound from './notFound'
import { Route, Redirect, Switch } from 'react-router-dom';

class Main extends React.Component {
    render() {
        return (
            <main className="text-white h-full w-full">
                <Switch>
                    <Route path="/" component={Market} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect to="/not-found" />
                </Switch>
            </main>);
    }
}

export default Main;