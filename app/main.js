import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Welcome from './components/Welcome'
import Lists from './components/Lists'
import ListDetail from './components/ListDetail'
import TaskDetail from './components/TaskDetail'
import NoMatch from './components/NoMatch'
import API from './api'
import Dispatcher from './dispatcher'
import constants from './constants'

let Api = new API();
Api.fetchLists();
Api.fetchTasks();

Dispatcher.register(function(action){
	switch (action.actionType) {
		case constants.CREATE_TASK:
				Api.createTask(action.data);
				break;
			break;
		case constants.UPDATE_TASK:
				Api.updateTask(action.data);
				break;
		case constants.DELETE_TASK:
				Api.deleteTask(action.data);
				break;
		case constants.CREATE_LIST:
				Api.createList(action.data);
				break;
			break;
		case constants.UPDATE_LIST:
				Api.updateList(action.data);
				break;
		case constants.DELETE_LIST:
				Api.deleteList(action.data);
				break;
	}
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
        <Route path="tabs" component={Home}/>
        <Route path="lists" component={Lists}/>
        <Route path="/list/:id" component={ListDetail}/>
        <Route path="/task/:id" component={TaskDetail}/>
        <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'))
