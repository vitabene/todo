import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Lists from './components/Lists'
import ListDetail from './components/ListDetail'
import TaskDetail from './components/TaskDetail'
import NoMatch from './components/NoMatch'
import API from './api'

API.fetchLists();
API.fetchTasks();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
        <Route path="lists" component={Lists}/>
        <Route path="/list/:id" component={ListDetail}/>
        <Route path="/task/:id" component={TaskDetail}/>
        <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'))
