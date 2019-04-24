import React from 'react';
import {HashRouter, Link,Route} from 'react-router-dom';
import Header from '../hearer/index';
import Footer from '../footer/index';
import Main from '../main/index';

export default class Router extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li>
                        <Link to ='/'>我是首页</Link>
                    </li>
                    <li>
                        <Link to ='/header'>我是头部</Link>
                    </li>
                    <li>
                        <Link to ='/footer'>我是底部</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}