import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import App from './components/App'
import Tabs from './components/Tabs'
import Welcome from './components/Welcome'
import Lists from './components/Lists'
import ListDetail from './components/list/ListDetail'
import TaskDetail from './components/task/TaskDetail'
import NoMatch from './components/NoMatch'
import API from './api'

API.fetchLists();
API.fetchTasks();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
        <Route path="tabs" component={Tabs}/>
        <Route path="lists" component={Lists}/>
        <Route path="/list/:id" component={ListDetail}/>
        <Route path="/task/:id" component={TaskDetail}/>
        <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'))
