import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Layout from './pages/layout';

import Home from './pages/components/home';
import NoFind from './pages/components/404';
import Login from './pages/components/login';
import Register from './pages/components/register';
import Tables from './pages/components/tables';
import Form2 from './pages/add';






class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout>
          <Switch>
              <Route exact={true} path='/' component={Home}/>
              <Route exact={true} path='/one/login' component={Login}/>
              <Route exact={true} path='/one/register' component={Register}/>
              <Route exact={true} path='/two/table1' component={Tables}/>
              {/*<Route exact={true} path='/two/table2' component={Form2}/>*/}
              <Route component={NoFind}/>
          </Switch>
        </Layout>
        </HashRouter>
    );
  }
}

export default App;
