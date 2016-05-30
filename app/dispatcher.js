import flux from 'flux'

const Dispatcher = new flux.Dispatcher();

// logging actions to console for debugging
Dispatcher.register(function(action) {
	console.log(action);
});

export default Dispatcher
