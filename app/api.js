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
			desc: data.description,
			completed: data.completed,
		}).then(actions.updatedTask.bind(actions));
	},
	deleteTask(id) {
		id = id.trim();
		if (id === '') return;
		post('/api/task/delete', {
			_id: id
		}, 'DELETE').then(actions.deletedTask.bind(actions));
	},
	saveTask: function(title, desc) {
		title = title.trim();
		if (typeof desc === "undefined") desc = "";
		desc = desc.trim();
		if (title === '') return;
		console.log({
			title: title,
			desc: desc
		});
		post('/api/task/create', {
			title: title,
			desc: desc
		}).then(actions.createdTask.bind(actions));
	}
};

export default API

Dispatcher.register(function(action){
	switch (action.actionType) {
		case constants.CREATE_TASK:
				API.saveTask(action.data);
				break;
			break;
		case constants.UPDATE_TASK:
				API.updateTask(action.data);
				break;
		case constants.DELETE_TASK:
				API.deleteTask(action.data);
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
