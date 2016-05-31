import actions from './actions'
import Dispatcher from './dispatcher'
import constants from './constants'

var API = {
	fetchLists: function() {
		get('/api/lists').then(actions.gotLists.bind(actions));
	},
	fetchTasks: function() {
		get('/api/tasks').then(actions.gotTasks.bind(actions));
	},
	updateTask(data) {
		data.id = data.id.trim();
		if (data.id === '') return;
		post('/api/task/update', {
			_id: data.id,
			title: data.title,
			desc: data.desc,
			completed: data.completed,
		}).then(actions.updatedTask.bind(actions));
	},
	deleteTask(id) {
		if (id === '') return;
		post('/api/task/delete', {
			_id: id
		}, 'DELETE').then(actions.deletedTask.bind(actions));
	},
	createTask: function(data) {
		let title = data.title.trim();
		if (typeof data.desc === "undefined") data.desc = "";
		let desc = data.desc.trim();
		if (title === '') return;
		post('/api/task/create', {
			title: title,
			desc: desc,
			lists: data.lists
		}).then(actions.createdTask.bind(actions));
	},
	createList: function(data) {
		let title = data.title.trim();
		let desc = data.desc.trim();
		if (title === '') return;
		post('/api/list/create', {
			title: title,
			desc: desc
		}).then(actions.createdList.bind(actions));
	}
};

export default API

Dispatcher.register(function(action){
	switch (action.actionType) {
		case constants.CREATE_TASK:
				API.createTask(action.data);
				break;
			break;
		case constants.UPDATE_TASK:
				API.updateTask(action.data);
				break;
		case constants.DELETE_TASK:
				API.deleteTask(action.data);
				break;
		case constants.CREATE_LIST:
				API.createList(action.data);
				break;
			break;
		case constants.UPDATE_LIST:
				API.updateList(action.data);
				break;
		case constants.DELETE_LIST:
				API.deleteList(action.data);
				break;
	}
});

function get(url) {
	return fetch(url, {
		credentials: 'include'
	}).then(function(res) {
		return res.json();
	});
}

function post(url, body, method) {
	if (method == null) method = 'POST'
	return fetch(url, {
		method: method,
		credentials: 'include',
		body: JSON.stringify(body || {}),
		headers: {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
	}).then(function(res) {
		return res.json();
	});
}
