import Dispatcher from './dispatcher'
import constants from './constants'

// generating functions for actions
Object.keys(constants).forEach(function(key) {
	var funcName = key.split('_').map(function(word, i) {
		if (i === 0) return word.toLowerCase();
		return word[0] + word.slice(1).toLowerCase();
	}).join('');

	exports[funcName] = function(data) {
		Dispatcher.dispatch({
			actionType: constants[key],
			data: data
		});
	};
});
