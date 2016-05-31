var constants = require('../constants');

var ListStore = module.exports = require('./store.js').extend({
	init: function() {
		this.bind(constants.GOT_LISTS, this.set);
		this.bind(constants.CREATED_LIST, this.set);
		this.bind(constants.UPDATED_LIST, this.set);
		this.bind(constants.DELETED_LIST, this.set);
	},
	getByIds: function(id){
		return this._data.filter(function(item) {
			// if list not empty
			if (typeof item.tasks !== "undefined")
				return item.tasks.indexOf(id) !== -1;
		});
	}
});
