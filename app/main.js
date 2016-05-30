import React from 'react'
import ReactDOM from 'react-dom'
import {hashHistory, Router, Route, IndexRoute, Link} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import API from './api'

API.fetchLists();
API.fetchTasks();

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'))
