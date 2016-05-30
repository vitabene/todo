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
			id: data.id,
			title: data.title,
			description: data.description,
			completed: "",
		}).then(actions.updatedTask.bind(actions));
	},
	saveTask: function(title, desc) {
		title = title.trim();
		desc = desc.trim();
		if (title === '') return;
		post('/api/task/create', {
			title: text,
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
	}
});

// function getRandomInt(min, max) {
  // return Math.floor(Math.random() * (max - min)) + min;
// }

function get(url) {
	return fetch(url, {
		credentials: 'include'
	}).then(function(res) {
		return res.json();
	});
}

function post(url, body) {
	return fetch(url, {
		method: 'POST',
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
