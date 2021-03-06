import assign from 'object-assign'
import EventEmitter from 'events'
import Dispatcher from '../dispatcher'

const CHANGE_EVENT = 'CHANGE';

var storeMethods = {
	init: function() {},
	set: function(arr) {
		if (arr === null) {
			console.log("data for store " + this.constructor.name + " is null");
			return
		}
		this._data = arr;
	},
	add: function(item) {
		this._data.push(item);
		this.sort();
	},
	sort: function() {
		this._data.sort(function(a, b) {
			return +new Date(b.created) - +new Date(a.created);
		});
	},
	all: function() {
		return this._data;
	},
	get: function(id) {
		return this._data.filter(function(item) {
			return item._id === id;
		})[0];
	},
	addChangeListener: function(fn) {
		this.on(CHANGE_EVENT, fn);
	},
	removeChangeListener: function(fn) {
		this.removeListener(CHANGE_EVENT, fn);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	bind: function(actionType, actionFn) {
		if (this.actions[actionType]) {
			this.actions[actionType].push(actionFn);
		} else {
			this.actions[actionType] = [actionFn];
		}
	}
};

exports.extend = function(methods) {
	var store = {
		_data: [],
		actions: {}
	};
	assign(store, EventEmitter.prototype, storeMethods, methods);

	store.init();

	Dispatcher.register(function(action) {
		if (store.actions[action.actionType]) {
			store.actions[action.actionType].forEach(function(fn) {
				fn.call(store, action.data);
				store.emitChange();
			});
		}
	});

	return store;
};
