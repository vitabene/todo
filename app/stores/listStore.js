var constants = require('../constants');

var ListStore = module.exports = require('./store.js').extend({
	init: function() {
		this.bind(constants.GOT_LISTS, this.set);
		this.bind(constants.CREATED_LIST, this.set);
		this.bind(constants.UPDATED_LIST, this.set);
		this.bind(constants.DELETED_LIST, this.set);
	}
});
