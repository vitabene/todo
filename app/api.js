import actions from './actions'
import Utils from './utils'

class API {
	static fetchLists() {
		Utils.get('/api/lists').then(actions.gotLists.bind(actions));
	}
	static fetchTasks() {
		Utils.get('/api/tasks').then(actions.gotTasks.bind(actions));
	}
	updateTask(data) {
		Utils.post('/api/task/update', data).then(actions.updatedTask.bind(actions));
	}
	deleteTask(id) {
		if (id === '') return;
		Utils.post('/api/task/delete', {
			_id: id
		}, 'DELETE').then(actions.deletedTask.bind(actions));
	}
	deleteList(data) {
		if (data._id === '') return;
		Utils.post('/api/list/delete', {
			_id: data._id,
			tasks: data.tasks
		}, 'DELETE').then(actions.deletedList.bind(actions));
	}
	createTask(data) {
		if (typeof data.desc === "undefined") data.desc = "";
		let [title, desc] = [data.title.trim(), data.desc.trim()];
		if (title === '') return;
		Utils.post('/api/task/create', {
			title: title,
			desc: desc,
			lists: data.lists
		}).then(actions.createdTask.bind(actions));
	}
	createList(data) {
		let [title, desc] = [data.title.trim(), data.desc.trim()];
		if (title === '') return;
		Utils.post('/api/list/create', {
			title: title,
			desc: desc
		}).then(actions.createdList.bind(actions));
	}
}

export default API
