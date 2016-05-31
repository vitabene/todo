var constants = require('../constants');

var TaskStore = module.exports = require('./store.js').extend({
	init: function() {
		this.bind(constants.GOT_TASKS, this.set);
		this.bind(constants.CREATED_TASK, this.set);
		this.bind(constants.UPDATED_TASK, this.set);
		this.bind(constants.DELETED_TASK, this.set);
	},
	allIncomplete: function() {
		var incompleteTasks = [];
		for (var i = 0; i < this._data.length; i++) {
			if (this._data[i].completed == 0)	incompleteTasks.push(this._data[i])
			// this._data[i].completed ? "" : incompleteTasks.push(this._data[i])
		}
		return incompleteTasks
		// return this._data.filter(function(task) {
			// return task.completed == 0;
		// });
	},
	getByListId: function(id) {
		var listTasks = [];
		return this._data.filter(function(task) {
			return task.lists.indexOf(id) !== -1;
		});
	}
});
