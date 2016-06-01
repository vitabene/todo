import flux from 'flux'
import constants from './constants'
import API from './api'


const Dispatcher = new flux.Dispatcher();
const Api = new API();
// logging actions to console for debugging
Dispatcher.register(function(action) {
	console.log(action);
});

Dispatcher.register(function(action){
	switch (action.actionType) {
		case constants.CREATE_TASK:
			Api.createTask(action.data);
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
		case constants.UPDATE_LIST:
			Api.updateList(action.data);
			break;
		case constants.DELETE_LIST:
			Api.deleteList(action.data);
			break;
	}
});

export default Dispatcher
