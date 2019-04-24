import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Header from '../hearer/index';
import Footer from '../footer/index';
import Main from '../main/index';
import Index from './index.js';

export default class Router extends React.Component{
    render(){
        return(
            <HashRouter>
                <Index>
                    <Route exact={true} path='/' component={Main}></Route>
                    <Route path='/header' component={Header}></Route>
                    <Route path='/footer' component={Footer}></Route>
                </Index>
            </HashRouter>

        )
    }
}